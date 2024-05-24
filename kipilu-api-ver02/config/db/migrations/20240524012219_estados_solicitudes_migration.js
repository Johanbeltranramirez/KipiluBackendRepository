exports.up = function(knex) {
    return knex.schema.createTable('Estados_Solicitudes', function(table) {
      table.integer('ID_Solicitud').unsigned().notNullable().primary();
      table.string('Estado_Solicitud', 15).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Estados_Solicitudes');
  };
  