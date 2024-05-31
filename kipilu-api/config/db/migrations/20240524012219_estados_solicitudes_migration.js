exports.up = function(knex) {
    return knex.schema.createTable('Estados_Solicitudes', function(table) {
      table.integer('ID_Solicitud').unsigned().notNullable().primary();
      table.string('Estado_Solicitud', 15).notNullable();
    })
    .then(function() {
      // Insertar datos
      return knex('Estados_Solicitudes').insert([
        { ID_Solicitud: 1, Estado_Solicitud: 'Aprobado' },
        { ID_Solicitud: 2, Estado_Solicitud: 'No Aprobado' },
        { ID_Solicitud: 3, Estado_Solicitud: 'Pendiente' }
      ]);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Estados_Solicitudes');
  };
  
