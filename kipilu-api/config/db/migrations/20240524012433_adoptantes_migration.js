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
    })
    .then(function() {
      // Insertar datos
      return knex('Adoptantes').insert([
        { 
          ID_Adoptante: 119020991,
          P_Nombre: 'Juan',
          P_Apellido: 'González',
          Correo: 'juanajjks@gmail.com',
          Direccion: 'Calle 12 D sur #12-42',
          Telefono: '3208892991'
        },
        { 
          ID_Adoptante: 119330923,
          P_Nombre: 'María',
          P_Apellido: 'López',
          Correo: 'maria277@hotmail.es',
          Direccion: 'Avenida Principal 2778 Este',
          Telefono: '3876543213'
        }
      ]);
    });
  };  
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Adoptantes');
  };
      
