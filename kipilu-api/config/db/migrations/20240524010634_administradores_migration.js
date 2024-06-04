const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.up = function(knex) {
    return knex.schema.createTable('Administradores', function(table) {
      table.string('ID_Administrador', 25).notNullable().primary();
      table.string('P_Nombre', 20).notNullable();
      table.string('S_Nombre', 20).nullable();
      table.string('P_Apellido', 20).notNullable();
      table.string('S_Apellido', 20).nullable();
      table.string('Contrasena', 100).notNullable(); // Incrementado para coincidir con la longitud del hash bcrypt
    })
    .then(async function() {
      // Datos a insertar con las contraseñas en texto plano
      const administradores = [
        { 
          ID_Administrador: 'Form',
          P_Nombre: 'Paula',
          S_Nombre: 'Andrea',
          P_Apellido: 'Cruz',
          S_Apellido: 'Zapata',
          Contrasena: 'F0rm5'
        },
        { 
          ID_Administrador: 'CC1027524883',
          P_Nombre: 'Johan',
          P_Apellido: 'Ramírez',
          S_Apellido: 'Beltrán',
          Contrasena: 'CC1027524883'
        }
      ];

      // Cifrado de contraseñas
      for (const admin of administradores) {
        admin.Contrasena = await bcrypt.hash(admin.Contrasena, saltRounds);
      }

      // Insertar datos con contraseñas cifradas
      return knex('Administradores').insert(administradores);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('Administradores');
};
