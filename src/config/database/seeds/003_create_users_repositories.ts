import { Knex } from 'knex';

const TABLE_NAME = 'users_repositories';

export async function seed(knex: Knex) {
  await knex(TABLE_NAME).insert([
    { id: 1, user_id: 1, repository_id: 1},
    { id: 2, user_id: 1, repository_id: 2},
    { id: 3, user_id: 2, repository_id: 2},
    { id: 4, user_id: 2, repository_id: 3}
  ]);
}
