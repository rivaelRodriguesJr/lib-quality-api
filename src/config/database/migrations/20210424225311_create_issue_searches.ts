import { Knex } from "knex";

const TABLE_NAME = 'issue_searches';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments('id').primary();
    table.integer('issues_qtd').notNullable();
    table.string('issues_average').notNullable();
    table.string('issues_standart_deviation').notNullable();
    table.date('moment').defaultTo(knex.fn.now());

    table.integer('repository_id').unsigned()
      .notNullable()
      .references('id')
      .inTable('repositories');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
