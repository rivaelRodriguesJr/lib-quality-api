import { Knex } from "knex";

const TABLE_NAME = 'repositories';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments('id').primary();
    table.string('owner').notNullable();
    table.string('name').notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}

