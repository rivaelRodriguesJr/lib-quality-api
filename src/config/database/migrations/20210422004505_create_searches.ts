import { Knex } from "knex";

const TABLE_NAME = 'searches';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments('id').primary();

    table.integer('user_id').unsigned()
      .notNullable()
      .references('id')
      .inTable('users');

    table.string('repository_owner');
    table.string('repository_name');
    table.integer('open_issues_count');
    table.integer('open_issues_average');
    table.integer('open_issues_standart_deviation');

  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}

