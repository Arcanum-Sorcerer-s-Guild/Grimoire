const knex = require("./dbConnections.js");
const { attachPaginate } = require("knex-paginate");
attachPaginate();

const getTemplates = async (id) => {
  if (id) {
    // console.log("id present", id);
    return await knex("templates").select("*").where("id", "=", id);
  } else {
    return await knex("templates").select("*");
  }
};

const deleteTemplate = (id) => {
  return knex("templates").where("id", "=", id).del();
};

const updateTemplates = async ([template], id) => {
  // console.log(id);
  if (id) {
    return await knex("templates").where("id", "=", id).update(template, "*");
  } else {
    // console.log(template);
    return await knex("templates").insert(template, "*");
  }
};

const getUsers = (name) => {
  name = name ? name : "*";
  return knex("users").select("*").where("id");
};

const getTags = async (name) => {
  const tagItems = name
    ? await knex("tags").select("*").where({ name: name })
    : await knex("tags").select("*");
  return tagItems;
};

const getEntries = async (search) => {
  const { page = 1 } = search;
  const { id = 0 } = search;
  const { title = "" } = search;
  const { desc = "" } = search;
  const { start = "1990-01-01" } = search;
  const { end = new Date().toISOString() } = search;
  const { user = "" } = search;

  let tagSearch = [];
  if ("tags" in search) {
    if (Array.isArray(search.tags)) {
      tagSearch = search.tags;
    } else {
      tagSearch = search.tags.split(",");
    }
  }
  return await knex("entries")
    .leftJoin("entry_tag", "entries.id", "entry_tag.entry_id")
    .leftJoin("tags", "entry_tag.tag_id", "tags.id")
    .leftJoin("users", "users.id", "entries.user_id")
    .select(
      "entries.*",
      "users.username as user",
      knex.raw("array_agg(tags.name) as tags")
    )
    .where(function () {
      if ("q" in search) {
        // console.log(search.q);
        this.whereRaw(
          `to_tsvector(entries::text) @@ to_tsquery('${search.q}:*')`
        ).orWhereRaw(
          `to_tsvector(users.username::text) @@ to_tsquery('${search.q}:*')`
        );
        // this.where(
        //   "entries.id",
        //   `${id === 0 ? ">" : "="}`,
        //   `${id}`
        // )
        // .orWhere("entries.title", "ilike", `%${search.q}%`)
        // .orWhere("entries.description", "ilike", `%${search.q}%`)
        // .orWhere("users.username", "ilike", `%${search.q}%`);
      } else {
        // console.log("search");
        this.where("entries.id", `${id === 0 ? ">" : "="}`, `${id}`)
          .andWhere("entries.title", "ilike", `%${title}%`)
          .andWhere("entries.description", "ilike", `%${desc}%`)
          .andWhere("entries.created", ">=", `${start}`)
          .andWhere("entries.created", "<=", `${end}`)
          .andWhere("users.username", "ilike", `%${user}%`);
      }
    })
    .groupBy("entries.id", "users.id")
    .orderBy("entries.created", "desc")
    // .havingRaw('entries.id IS NOT NULL')
    .havingRaw(
      search.tags
        ? `(
      ${tagSearch
        .map((name) => `bool_or(tags.name = '${name}')`)
        .join(" AND ")})`
        : `entries.id IS NOT NULL`
    )
    .paginate({
      perPage: 50,
      currentPage: page,
      isLengthAware: true,
    });
};

const createTag = async (name) => {
  // console.log("inserting Name");
  return await knex("tags").insert({ name: name }, "id");
};

const createEntryTagMiddle = async (tagId, entryId) => {
  // console.log("createEntryTagMiddle", "entryID", entryId, "tag ID", tagId);
  return await knex("entry_tag").insert(
    {
      entry_id: entryId,
      tag_id: tagId,
    },
    "id"
  );
};

const deleteEntryTagMiddle = async (entryTagId) => {
  const deleteJoinedItem = await knex("entry_tag")
    .where("entry_id", "=", entryTagId)
    .del();
  return `deleteJoinedItem`;
};

const createEntry = async ({ title, description, user_id, tags }) => {
  console.log("createEntry", { title, description, user_id, tags });
  return await knex("entries")
    .insert(
      {
        title: title,
        description: description,
        user_id: user_id,
      },
      "*"
    )
    .then(async ([entryCreated]) => {
      // console.log("test", entryCreated);
      await tags.map(async (tag, index) => {
        await getTags(tag).then(async ([data]) => {
          // console.log(tags);
          if (data === undefined) {
            await createTag(tag).then(async ([createTagItem]) => {
              createEntryTagMiddle(createTagItem.id, entryCreated.id);
            });
          } else {
            createEntryTagMiddle(data.id, entryCreated.id);
          }
        });
      });
      return [{ ...entryCreated, tags }];
    });
};

const updateEntry = async ([{ description, tags }], id) => {
  // console.log(id);
  const test = await knex("entries")
    .where("id", "=", id)
    .update(
      {
        description: description,
        updated: new Date().toISOString(),
      },
      "*"
    )
    .then(async (entryCreated) => {
      await deleteEntryTagMiddle(id);
      // console.log(entryCreated);
      return entryCreated;
    })
    .then(async ([entryCreated]) => {
      // console.log(entryCreated);
      await tags.map(async (tag, index) => {
        await getTags(tag).then(async ([data]) => {
          if (data === undefined) {
            await createTag(tag).then(async ([createTagItem]) => {
              createEntryTagMiddle(createTagItem.id, entryCreated.id);
            });
          } else {
            createEntryTagMiddle(data.id, entryCreated.id);
          }
        });
      });
      return [{ ...entryCreated, tags }];
    });

  // console.log(test);
  return test;
};

const deleteEntry = async (id) => {
  const deleteEntryItem = await deleteEntryTagMiddle(id).then(async () => {
    await knex("entries").where("id", "=", id).del();
    return `item: ${id} is deleted`;
  });
  return deleteEntryItem;
};

const countEntries = async () => knex("entries").count("id");

const getUserByUsername = async (username) => {
  return await knex("users").where("username", "ilike", username);
};

const createUser = async (username, hashedPassword, isAdmin) => {
  console.log("creating user:", { username, hashedPassword, isAdmin });
  return await knex("users")
    .insert([
      {
        username: username,
        password: hashedPassword,
        is_admin: isAdmin,
      },
    ])
    .returning("*");
};

module.exports = {
  getUsers,
  getTags,
  getEntries,
  deleteEntry,
  createTag,
  createEntryTagMiddle,
  createEntry,
  updateEntry,
  countEntries,
  getTemplates,
  deleteTemplate,
  updateTemplates,
  getUserByUsername,
  createUser,
};
