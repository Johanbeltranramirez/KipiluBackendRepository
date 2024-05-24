exports.up = function(knex) {
    return knex.schema.createTable('Estados_Animales', function(table) {
      table.integer('ID_Estado').unsigned().notNullable().primary();
      table.string('Nombre_Proceso', 20).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Estados_Animales');
  };
   