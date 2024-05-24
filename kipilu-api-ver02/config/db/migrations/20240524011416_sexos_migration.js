exports.up = function(knex) {
    return knex.schema.createTable('Sexos', function(table) {
      table.integer('ID_Sexo').unsigned().notNullable().primary();
      table.string('Nombre_Sexo', 10).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Sexos');
  };  
