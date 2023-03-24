const seedFaker = require('../faker.js');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  
  // const seed_entry_tags = [
  //   {
  //     entry_id: 'random number up to number of entries',
  //     tag_id: 'random number up to number of tags'
  //   },
  //   {
  //     entry_id: 'random number up to number of entries',
  //     tag_id: 'random number up to number of tags'
  //   },
  //   ...
  // ]
  
  await knex("entry_tag").del()
  await knex("entry_tag")
    .insert(seedFaker.generateEntryTagsSeed());
};
