exports.up = function(knex) {
    return knex.schema.createTable('Especies', function(table) {
      table.integer('ID_Especie').unsigned().notNullable().primary();
      table.string('Especie_Animal', 10).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Especies');
  };
  