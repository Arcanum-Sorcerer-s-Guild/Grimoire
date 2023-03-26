const knex = require("./dbConnections.js");

// Controller: GET user from the DB
const getUsers = (name) => {
  name = name ? name : "*";
  //   return knex("tags").select("id").where({ username: name }, "id");
  const test = knex("users").select("*").where("id");
  console.log(test);
  return test;
};

// Controller: GET tag from the DB
const getTags = (name) => {
  name
    ? (name = knex("tags").select("*").where({ name: name }))
    : (name = knex("tags").select("*"));
  return name;
};

// Controller: GET entry from the DB
const getEntries = (search) => {
  console.log(search);
  return knex("entries")
    .select(
      "entries.*",
      "users.username as user",
      knex.raw("array_agg(DISTINCT tags.name) as tags")
    )
    .join("users", "users.id", "entries.user_id")
    .join("entry_tag", "entries.id", "entry_tag.entry_id")
    .join("tags", "entry_tag.tag_id", "tags.id")
    .where(function () {
      this.where(
        "entries.id",
        `${search.id ? "=" : ">"}`,
        `${search.id ? search.id : 0}`
      )
        // .andWhere(
        //   "entries.title",
        //   "like",
        //   `%%${search.title ? search.title : ""}%%`
        // )
        // .andWhere(
        //   "entries.description",
        //   "like",
        //   `%%${search.desc ? search.desc : ""}%%`
        // )
        // .andWhere(
        //   "entries.created",
        //   ">=",
        //   `${search.start ? search.start : "1990-01-01"}`
        // )
        // .andWhere(
        //   "entries.created",
        //   "<=",
        //   `${search.end ? search.end : new Date().toISOString()}`
        // )
        // .andWhere(
        //   "users.username",
        //   "like",
        //   `%${search.user ? search.user : ""}`
        // );
      // .whereIn("tags.name", search.tag ? search.tag : ["%%"])
    })
    .groupBy("entries.id", "users.id")
    .orderBy("entries.id");
};

// Controller: POST a new Tag to the DB
const createTag = (name) => {
  return knex("tags").insert({ name: name });
};

// Controller: POST a new Tag-Entry relationship to the DB
const createEntryTag = (tags) => {
  return knex("entry-tag").insert(tags);
};

// Controller: POST a new entry to the DB
const createEntry = ([{ title, description, user_id, tags }]) => {

  const submitEntry = knex("entries").insert({
    title: title,
    description: description,
    user_id: user_id,
  }, "id");

  console.log("sub", submitEntry)

  const foundTags = [];
  tags.forEach((tag) => {
    const tagFound = getAllTags(tag);
    tagFound.then((data) => {
      if (data.length === 0) {
        const returnedTag = createTag(tag);
        foundTags.push({
          tag_id: returnedTag.id,
          entry_id: submitEntry[0].id,
        });
      } else {
        foundTags.push({
          tag_id: data.id,
          entry_id: submitEntry[0].id,
        });
      }
    });
  });

  createEntryTag(foundTags);
};

module.exports = {
  getUsers,
  getTags,
  getEntries,
  createTag,
  createEntryTag,
  createEntry,
};
