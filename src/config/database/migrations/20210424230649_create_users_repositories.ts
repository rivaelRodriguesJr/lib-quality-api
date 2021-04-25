import { Knex } from "knex";

const TABLE_NAME = 'users_repositories';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments('id').primary();

    table.integer('repository_id').unsigned()
      .notNullable()
      .references('id')
      .inTable('repositories')

    table.integer('user_id').unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}


