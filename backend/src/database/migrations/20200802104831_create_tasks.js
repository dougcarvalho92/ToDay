exports.up = function (knex) {
  return knex.schema.createTable("tasks", function (table) {
    table.increments("id").primary();
    table.integer("nome").notNullable();
    table.boolean("concluida").notNullable();
    table.integer("listaId").notNullable();
    table.foreign("listaId").references("id").inTable("list");
    table.string("usuarioId").notNullable();
    table.foreign("usuarioId").references("id").inTable("users");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tasks");
};
