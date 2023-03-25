const { faker } = require("@faker-js/faker");
const knex = require("knex")(require("../knexfile.js")["development"]);

const numUsers = 100;
const numEntries = 1500;
const numTags = 25;
const numEntryTags = 4000;
const numTemplates = 20;

const generateFakeParagraph = (numSentences) => {
  const fakeParagraph = [];
  for (let i = 0; i < numSentences; i++) {
    fakeParagraph.push(faker.hacker.phrase());
  }
  return fakeParagraph.join(" ");
};

function generateEntriesSeed(
  numSeeds = numEntries,
  countUsers = numUsers,
  sentencesInDescription = 5
) {
  const seed_entries = [];
  for (let i = 0; i < numSeeds; i++) {
    let date = faker.date.between(
      "2021-01-01T00:00:00.000Z",
      "2023-01-01T00:00:00.000Z"
    );
    seed_entries.push({
      title: faker.hacker.verb() + " " + faker.hacker.noun(),
      description: generateFakeParagraph(sentencesInDescription),
      created: date,
      updated: date,
      user_id: faker.datatype.number({ min: 1, max: countUsers }),
    });
  }
  return seed_entries;
}

function generateUsersSeed(numSeeds = numUsers) {
  const seed_entries = [];
  for (let i = 0; i < numSeeds; i++) {
    seed_entries.push({
      username: faker.internet.userName(),
    });
  }
  return seed_entries;
}

function generateTagsSeed(numSeeds = numTags) {
  const seed_entries = [];
  for (let i = 0; i < numSeeds; i++) {
    seed_entries.push({
      name: faker.hacker.noun(),
    });
  }
  return seed_entries;
}

function generateEntryTagsSeed(
  countEntries = numEntries,
  countTags = numTags,
  numSeeds = numEntryTags
) {
  const seed_entries = [];
  for (let i = 0; i < numSeeds; i++) {
    seed_entries.push({
      entry_id: faker.datatype.number({ min: 1, max: countEntries }),
      tag_id: faker.datatype.number({ min: 1, max: countTags }),
    });
  }
  return seed_entries;
}

const generateTemplatesSeed = async (
  numSeeds = numTemplates,
  // countUsers = numUsers,
  numTagsToAttach = 3,
  sentencesInDescription = 5
) => {
  const randomInRange = (min, max) =>
    Math.floor(Math.random() * (max - min) + min);

  let tagOptions = await knex.select("name").from("tags");

  let tagSelections = [];
  for (let i = 0; i < numTagsToAttach; i++) {
    tagSelections.push(
      tagOptions.splice(randomInRange(0, tagOptions.length), 1)[0]
    );
  }

  const templates = [];
  for (let i = 0; i < numSeeds; i++) {
    let genTitle = faker.hacker.verb() + " " + faker.hacker.noun();
    templates.push({
      name: `${genTitle} - Template`,
      form_data: {
        title: genTitle,
        description: generateFakeParagraph(sentencesInDescription),
        tags: tagSelections,
        // userId: faker.datatype.number({min:1,max:countUsers}),
      },
    });
  }

  return templates;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  // Insert users
  let usersSeed = await generateUsersSeed();
  await knex("users").del();
  await knex("users").insert(usersSeed);
  console.log(`Inserted ${usersSeed.length} users`);

  // Insert tags
  let tagsSeed = await generateTagsSeed();
  await knex("tags").del();
  await knex("tags").insert(tagsSeed);
  console.log(`Inserted ${tagsSeed.length} tags`);

  // Insert entries
  let entriesSeed = await generateEntriesSeed();
  await knex("entries").del();
  await knex("entries").insert(entriesSeed);
  console.log(`Inserted ${entriesSeed.length} entries`);

  // Insert entry_tags
  let entryTagsSeed = await generateEntryTagsSeed();
  await knex("entry_tag").del();
  await knex("entry_tag").insert(entryTagsSeed);
  console.log(`Inserted ${entryTagsSeed.length} entry_tag relationships`);

  // Insert templates
  let templatesSeed = await generateTemplatesSeed();
  await knex("templates").del();
  await knex("templates").insert(templatesSeed);
  console.log(`Inserted ${templatesSeed.length} templates`);
};
