import { Knex } from 'knex';

const TABLE_NAME = 'users';

export async function seed(knex: Knex) {
  await knex(TABLE_NAME).insert([
    { id: 1, name: 'Carlos Vieria', username: 'carlos@gmail.com', password: '$2a$08$69HlvXMvx1HTxEiJHm4p9ei8W1aXMlIVSNKBBDcSSMjnvQq8RdC7G' },
    { id: 2, name: 'Marcos Souza', username: 'marcos@gmail.com', password: '$2a$08$69HlvXMvx1HTxEiJHm4p9ei8W1aXMlIVSNKBBDcSSMjnvQq8RdC7G' }
  ]);
}
