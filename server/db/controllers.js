const knex = require("./dbConnections.js");
const { attachPaginate } = require("knex-paginate");
attachPaginate();

const getUsers = (name) => {
  name = name ? name : "*";
  const test = knex("users").select("*").where("id");
  return test;
};

const getTags = (name) => {
  name
    ? (name = knex("tags").select("*").where({ name: name }))
    : (name = knex("tags").select("*"));
  return name;
};

const getEntries = async (search) => {
  const { page = 1 } = search;
  let tagSearch = [];
  if ("tags" in search) {
    if (Array.isArray(search.tags)) {
      tagSearch = search.tags;
    } else {
      tagSearch = search.tags.split(",");
    }
  }
  console.log(search);
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
      this.where(
        "entries.id",
        `${search.id ? "=" : ">"}`,
        `${search.id ? search.id : 0}`
      )
        .andWhere(
          "entries.title",
          "ilike",
          `%${search.title ? search.title : ""}%`
        )
        .andWhere(
          "entries.description",
          "ilike",
          `%${search.desc ? search.desc : ""}%`
        )
        .andWhere(
          "entries.created",
          ">=",
          `${search.start ? search.start : "1990-01-01"}`
        )
        .andWhere(
          "entries.created",
          "<=",
          `${search.end ? search.end : new Date().toISOString()}`
        )
        .andWhere(
          "users.username",
          "ilike",
          `%${search.user ? search.user : ""}%`
        );
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
};
