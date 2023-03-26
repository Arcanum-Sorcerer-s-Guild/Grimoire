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
      knex.raw("array_agg(tags.name) as tags")
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
const createTag = async (name) => {
  return await knex("tags").insert({ name: name }, "id");
};

// Controller: POST a new Tag-Entry relationship to the DB
const createEntryTag = async (tags) => {
  return await knex("entry-tag").insert(tags);
};

// Controller: POST a new entry to the DB
const createEntry = async ([{ title, description, user_id, tags }]) => {
  const [submitEntry] = await knex("entries").insert({
    title: title,
    description: description,
    user_id: user_id,
  }, "id");

  const foundTags = [];
 tags.forEach( (tag) => {
    const tagFound = getTags(tag)
    .then((data) => {
      if (data.length === 0) {
        const returnedTag = createTag(tag);
        foundTags.push({
          tag_id: returnedTag.id,
          entry_id: submitEntry.id,
        });
      } else {
        foundTags.push({
          tag_id: data[0].id,
          entry_id: submitEntry.id,
        });
      }
    })
    .then(data => {
      console.log("foundTags", foundTags);
    })
  });
// console.log("foundTags", foundTags);

//   const test = createEntryTag(foundTags);
//   console.log(test)
};

module.exports = {
  getUsers,
  getTags,
  getEntries,
  createTag,
  createEntryTag,
  createEntry,
};