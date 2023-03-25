const knex = require("knex")(
  require("../knexfile.js")["development"]
);


const generateFakeParagraph = (numSentences) => {
  const fakeParagraph = [];
  for (let i = 0; i < numSentences; i++) {
    fakeParagraph.push(faker.hacker.phrase());
  }
  return fakeParagraph.join(' ');
};


function generateEntriesSeed(numSeeds = num_entries) {
  const seed_entries = []
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
  }
  console.log(`Generated ${seed_entries.length} entries`);
  return seed_entries;
}

function generateUsersSeed(numSeeds = num_users) {
  const seed_entries = [];
  for (let i = 0; i < numSeeds; i++) {
    seed_entries.push(
      {
        username : faker.internet.userName(),
      }
    )
  }
  console.log(`Generated ${seed_entries.length} users`);
  return seed_entries;
} 

function generateTagsSeed(numSeeds = num_tags) {
  const seed_entries = []
  for (let i = 0; i < numSeeds; i++) {
    seed_entries.push(
      {
        name : faker.hacker.noun(),
      }
    )
  }
  console.log(`Generated ${seed_entries.length} tags`);
  return seed_entries;
}

      entry_id: faker.datatype.number({ min: 1, max: countEntries }),
      tag_id: faker.datatype.number({ min: 1, max: countTags }),
  console.log(`Generated ${seed_entries.length} entry_tag relationships`);
  return seed_entries;
const generateTemplatesSeed = async (
  numSeeds = numTemplates,
  // countUsers = numUsers,
  numTagsToAttach = 3,
  sentencesInDescription = 5,
) => {
  const randomInRange = (min, max) => Math.floor(Math.random() * (max - min) + min);

  let tagOptions = await knex.select("name").from("tags");
  
  let tagSelections = [];
  for (let i = 0; i < numTagsToAttach; i++) {
    tagSelections.push(tagOptions.splice(randomInRange(0, tagOptions.length), 1)[0]);
  }


          description: generateFakeParagraph(sentencesInDescription),
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

    // Insert users
    await knex("users").del();
    await knex("users")
      .insert(generateUsersSeed());
    console.log('Inserted users');
    
    // Insert tags
    await knex("tags").del();
    await knex("tags")
    .insert(generateTagsSeed());
    console.log('Inserted tags');
    
    // Insert entries
    await knex("entries").del();
    await knex("entries")
    .insert(generateEntriesSeed());
    console.log('Inserted entries');
    
    // Insert entry_tags
    await knex("entry_tag").del()
    await knex("entry_tag")
    .insert(generateEntryTagsSeed());
    console.log('Inserted entry_tag relationships');

};
