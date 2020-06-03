import Knex from "knex";

//Upgrade do schema da tabela
export async function up(knex: Knex) {
    return knex.schema.createTable('itens', (table) => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
      });
}

//Downgrade do schema da tabela
export async function down(knex:Knex) {
    return knex.schema.dropTable('itens');
}
