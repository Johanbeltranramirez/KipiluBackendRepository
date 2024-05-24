exports.up = function(knex) {
    return knex.schema.createTable('Administradores', function(table) {
      table.string('ID_Administrador', 25).notNullable().primary();
      table.string('P_Nombre', 20).notNullable();
      table.string('S_Nombre', 20).nullable();
      table.string('P_Apellido', 20).notNullable();
      table.string('S_Apellido', 20).nullable();
      table.string('Contrasena', 30).notNullable();
    })
    .then(function() {
      // Insertar datos
      return knex('Administradores').insert([
        { 
          ID_Administrador: 'CC19029900',
          P_Nombre: 'Paula Andrea',
          P_Apellido: 'Cruz Zapata',
          Contrasena: 'ANSDI1998@'
        },
        { 
          ID_Administrador: 'CC1027524883',
          P_Nombre: 'Johan',
          P_Apellido: 'Ramírez Beltrán',
          Contrasena: 'jfrb1234'
        }
      ]);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Administradores');
  };
