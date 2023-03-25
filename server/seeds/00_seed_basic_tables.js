const {faker} = require('@faker-js/faker');


let num_users = 100;
let num_entries = 1500;
let num_tags = 50;
let num_entry_tags = 4000;
// let num_users = 100;
// let num_entries = 1500;
// let num_tags = 25;
// let num_entry_tags = 4000;


function generateEntriesSeed(numSeeds = num_entries) {
  const seed_entries = []
  for (let i = 0; i < numSeeds; i++) {
    let date = faker.date.between(
      "2021-01-01T00:00:00.000Z",
      "2023-01-01T00:00:00.000Z"
    );
    seed_entries.push({
      title: faker.hacker.verb() + " " + faker.hacker.noun(),
      description: faker.hacker.phrase(),
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

function generateEntryTagsSeed(numEntries = num_entries,
    numTags = num_tags,
    numSeeds = num_entry_tags) {
  const seed_entries = []
  for (let i=0; i < numSeeds; i++) {
    seed_entries.push(
      {
        entry_id: faker.datatype.number({min:1,max:num_users}),
        tag_id: faker.datatype.number({min:1,max:num_users})
      }
    )
  }
  let maxEntry = 1;
  let minEntry = 1;
  let maxTag = 1;
  let minTag = 1;
  seed_entries.forEach(pair => {
    if (pair.entry_id > maxEntry) {
      maxEntry = pair.entry_id
    } else if (pair.entry_id < minEntry) {
      minEntry = pair.entry_id
    }
    if (pair.tag_id > maxTag) {
      maxTag = pair.tag_id
    } else if (pair.tag_id < minTag) {
      minTag = pair.tag_id
    }
  })
  // console.log('maxEntry', maxEntry);
  // console.log('minEntry', minEntry);
  // console.log('maxTag', maxTag);
  // console.log('minTag', minTag);
  // console.log(seed_entries);
  console.log(`Generated ${seed_entries.length} entry_tag relationships`);
  return seed_entries;
  }


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
