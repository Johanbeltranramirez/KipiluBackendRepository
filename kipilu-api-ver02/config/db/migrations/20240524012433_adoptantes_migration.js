exports.up = function(knex) {
    return knex.schema.createTable('Adoptantes', function(table) {
      table.integer('ID_Adoptante').unsigned().notNullable().primary();
      table.string('P_Nombre', 20).notNullable();
      table.string('S_Nombre', 20).nullable();
      table.string('P_Apellido', 20).notNullable();
      table.string('S_Apellido', 20).nullable();
      table.string('Correo', 40).notNullable();
      table.string('Direccion', 40).notNullable();
      table.string('Telefono', 20).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Adoptantes');
  };
    