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
    })
    .then(function() {
      // Insertar datos
      return knex('Formularios').insert([
        { 
          Adoptante: 119020991, 
          Animal: 1, 
          Validacion_donativo: 'NA',
          Estado_solicitud: 3, 
          Administrador: 'CC19029900' 
        },
        { 
          Adoptante: 119330923, 
          Animal: 4, 
          Validacion_donativo: 'NA',
          Estado_solicitud: 3, 
          Administrador: 'CC19029900' 
        }
      ]);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Formularios');
  };
  
