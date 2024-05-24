exports.up = function(knex) {
    return knex.schema.createTable('Administradores', function(table) {
      table.string('ID_Administrador', 25).notNullable().primary();
      table.string('P_Nombre', 20).notNullable();
      table.string('S_Nombre', 20).nullable();
      table.string('P_Apellido', 20).notNullable();
      table.string('S_Apellido', 20).nullable();
      table.string('Contrasena', 256).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Administradores');
  };
  
