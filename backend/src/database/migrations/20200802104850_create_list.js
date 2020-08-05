exports.up = function (knex) {
  return knex.schema.createTable("list", function (table) {
    table.increments("id").primary();
    table.integer("nome").notNullable();
    table.string("usuarioId").notNullable();
    table.boolean("concluida").notNullable();
    table.foreign("usuarioId").references("id").inTable("users");
    table.integer("categoriaId").notNullable();
    table.foreign("categoriaId").references("id").inTable("list_categories");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("list");
};
