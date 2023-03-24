const seedFaker = require('../faker.js');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  // const seed_users = [
  //   {username: 'user1'},
  //   {username: 'user2'},
  //   ...
  // ]

  // const seed_tags = [
  //   {name: 'tag1'},
  //   {name: 'tag2'},
  //   ...
  // ]

  // Insert users
  await knex("users").del();
  await knex("users")
    .insert(seedFaker.generateUsersSeed());

  // Insert tags
  await knex("tags").del();
  await knex("tags")
    .insert(seedFaker.generateTagsSeed());

};
