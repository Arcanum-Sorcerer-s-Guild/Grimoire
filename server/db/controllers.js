const knex = require("./dbConnections.js");


// Controller: GET user from the DB
const getUsers = (name) => {
  name = name ? name : "*";
//   return knex("tags").select("id").where({ username: name }, "id");
  const test =  knex("users")
  .select("*")
  .where("id")
  console.log(test)
  return test
};

// Controller: GET tag from the DB
const getTags = (name) => {
  name = name ? name : "*";
  return knex("tags").select("id").where({ name: name });
};

// Controller: GET entry from the DB
const getEntries = () => {
  return knex("entries")
    .select(
      "users.username",
      "entries.title",
      "entries.description",
      "entries.created",
      "entries.updated",
      knex.raw('array_agg(DISTINCT tags.name) as tags'), 
    //   ARRAY[tags.name],
    )
    .join("entry_tag", "entries.id", "entry_tag.entry_id")
    .join("tags", "entry_tag.tag_id", "tags.id")
    .join("users", "entries.user_id", "=", "users.id")
    // .groupBy("entries.id", "tags.name");
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
const createEntry = ({ title, description, user_id, tags }) => {
  const submitEntry = knex("entries").insert({
    title: title,
    description: description,
    user_id: user_id,
  });

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

  createEntryTag(foundTags)
};

module.exports = { getUsers, getTags, getEntries, createTag, createEntryTag, createEntry };
