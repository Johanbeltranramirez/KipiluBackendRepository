exports.up = function(knex) {
    return knex.schema.createTable('Razas', function(table) {
      table.increments('ID_Raza').primary();
      table.string('Nombre_Raza', 20).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Razas');
  };
  