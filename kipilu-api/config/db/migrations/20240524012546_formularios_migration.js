exports.up = function(knex) {
  return knex.schema.createTable('Formularios', function(table) {
    table.increments('ID_Formulario').primary();
    table.integer('ID_Adoptante').unsigned().notNullable();
    table.integer('ID_Animal').unsigned().notNullable();
    table.string('Validacion_donativo', 2).notNullable();
    table.integer('Estado_solicitud').unsigned().nullable();
    table.string('Administrador', 25).notNullable();

    table.foreign('ID_Adoptante').references('ID_Adoptante').inTable('Adoptantes');
    table.foreign('ID_Animal').references('ID_Animal').inTable('Animales');
    table.foreign('Estado_solicitud').references('ID_Solicitud').inTable('Estados_Solicitudes');
    table.foreign('Administrador').references('ID_Administrador').inTable('Administradores');
  })
  .then(function() {
    // Insertar datos
    return knex('Formularios').insert([
      { 
        ID_Adoptante: 119020991, 
        ID_Animal: 2, 
        Validacion_donativo: 'NA',
        Estado_solicitud: 3, 
        Administrador: 'Form'
      },
      { 
        ID_Adoptante: 119330923, 
        ID_Animal: 3, 
        Validacion_donativo: 'NA',
        Estado_solicitud: 3, 
        Administrador: 'Form' 
      }
    ]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('Formularios');
};

