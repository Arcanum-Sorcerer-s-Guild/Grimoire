const knex = require("./dbConnections.js");
const { attachPaginate } = require("knex-paginate");
attachPaginate();

const getTemplates = async (id) => {
  if (id) {
    console.log("id present", id)
    return await knex("templates").select("*").where("id", "=", id);
  } else {
    return await knex("templates").select("*");
  }
};//✅

const deleteTemplate = (id) => {
  return knex("templates").where("id", "=", id).del();
};//✅


const updateTemplates = async ([template], id) => {
console.log(id)
  if (id) {
    return await knex("templates").where("id", "=", id ).update(
      template,
      "*"
    );
  } else {
    console.log(template)
    return await knex("templates").insert(
      template,
      "*"
    );
  }
};

const getUsers = (name) => {
  name = name ? name : "*";
  return knex("users").select("*").where("id");
};

const getTags = (name) => {
  name
    ? (name = knex("tags").select("*").where({ name: name }))
    : (name = knex("tags").select("*"));
  return name;
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
        console.log(search.q);
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
        console.log("search");
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
  return await knex("tags").insert({ name: name }, "id");
};

const createEntryTagMiddle = async ([entryId], tagId) => {
  console.log(entryId.id, tagId);
  return await knex("entry_tag").insert({
    entry_id: entryId.id,
    tag_id: tagId,
  });
};

const createEntry = async ([{ title, description, user_id, tags }]) => {
  const [submitEntry] = await knex("entries").insert(
    {
      title: title,
      description: description,
      user_id: user_id,
    },
    "*"
  );
  await tags.forEach(async (tag) => {
    await getTags(tag).then(async ([data]) => {
      if (data === undefined) {
        await createEntryTagMiddle(await createTag(tag), submitEntry.id);
      } else {
        await createEntryTagMiddle(data.id, submitEntry.id);
      }
    });
  });
  // return submitEntry;
  return { ...submitEntry, tags };
};

module.exports = {
  getUsers,
  getTags,
  getEntries,
  createTag,
  createEntryTagMiddle,
  createEntry,
  getTemplates,
  deleteTemplate,
  updateTemplates,
};
