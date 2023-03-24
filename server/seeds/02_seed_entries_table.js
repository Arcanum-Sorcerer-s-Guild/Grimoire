const seedFaker = require('../faker.js');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  
  // const seed_entries = [
  //   {
  //     title: 'Entry 1',
  //     description: 'Entry 1 description',
  //     created: 'datetime string',
  //     updated: 'datetime string',
  //     user_id: 'random number up to number of users'
  //   },
  //  {
  //     title: 'Entry 2',
  //     description: 'Entry 2 description',
  //     created: 'datetime string',
  //     updated: 'datetime string',
  //     user_id: 'random number up to number of users'
  //   },
  //  ...
  // ]

  await knex("entries").del();
  await knex("entries")
    .insert(seedFaker.generateEntriesSeed());


};
