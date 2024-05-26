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
          ID_Administrador: 'Default',
          P_Nombre: 'Paula',
          S_Nombre: 'Andrea',
          P_Apellido: 'Cruz',
          S_Apellido: 'Zapata',
          Contrasena: 'Default@$'
        },
        { 
          ID_Administrador: 'CC1027524883',
          P_Nombre: 'Johan',
          P_Apellido: 'Ramírez',
          S_Apellido: 'Beltrán',
          Contrasena: 'jfrb1234'
        }
      ]);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Administradores');
  };
