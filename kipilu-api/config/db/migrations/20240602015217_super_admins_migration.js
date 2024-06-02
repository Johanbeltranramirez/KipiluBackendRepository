exports.up = function(knex) {
    return knex.schema.createTable('Super_admins', function(table) {
      table.string('ID_Superadmin', 25).notNullable().primary();
      table.string('P_Nombre', 20).notNullable();
      table.string('S_Nombre', 20).nullable();
      table.string('P_Apellido', 20).notNullable();
      table.string('S_Apellido', 20).nullable();
      table.string('Contrasena', 30).notNullable();
      table.string('Correo', 40).notNullable();
      table.string('Telefono', 20).notNullable();
    })
    .then(function() {
      // Insertar datos
      return knex('Super_admins').insert([
        { 
          ID_Superadmin: 'Default01',
          P_Nombre: 'Marcela',
          S_Nombre: 'Cecilia',
          P_Apellido: 'Peña',
          S_Apellido: 'López',
          Contrasena: 'def1092001002@$',
          Correo: 'marc12pena@hotmail.com',
          Telefono: '3183742972'
        },
        { 
          ID_Superadmin: 'Default02',
          P_Nombre: 'Diego',
          S_Nombre: 'Fernando',
          P_Apellido: 'Madrigal',
          S_Apellido: 'Marín',
          Contrasena: 'def1224567892$@',
          Correo: 'juancaceres.abc16@gmail.com',
          Telefono: '3143683603'
        }
      ]);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Super_admins');
  };
