exports.up = function(knex) {
    return knex.schema.createTable('Formularios', function(table) {
      table.increments('ID_Formulario').primary();
      table.integer('Adoptante').unsigned().notNullable();
      table.integer('Animal').unsigned().notNullable();
      table.string('Validacion_donativo', 4).notNullable();
      table.integer('Estado_solicitud').unsigned().nullable();
      table.string('Administrador', 25).notNullable();
  
      table.foreign('Adoptante').references('ID_Adoptante').inTable('Adoptantes');
      table.foreign('Animal').references('ID_Animal').inTable('Animales');
      table.foreign('Estado_solicitud').references('ID_Solicitud').inTable('Estados_Solicitudes');
      table.foreign('Administrador').references('ID_Administrador').inTable('Administradores');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Formularios');
  };
  