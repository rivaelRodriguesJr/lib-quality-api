import { Knex } from 'knex';

const TABLE_NAME = 'repositories';

export async function seed(knex: Knex) {
  await knex(TABLE_NAME).insert([
    { id: 1, owner: 'facebook', name: 'react' },
    { id: 2, owner: 'angular', name: 'angular' },
    { id: 3, owner: 'vuejs', name: 'vue' }
  ]);
}
