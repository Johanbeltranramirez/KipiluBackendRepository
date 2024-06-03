const knex = require('../../config/db/db');
const bcrypt = require('bcrypt');

const administradorcreate = {};

administradorcreate.create = (administrador, result) => {
    // Generar un hash de la contraseña antes de almacenarla
    bcrypt.hash(administrador.Contrasena, 10, (err, hash) => {
        if (err) {
            console.error('Error al generar el hash de la contraseña: ', err);
            result(err, null);
        } else {
            // Insertar el administrador en la base de datos con la contraseña encriptada y el hash
            knex('administradores')
                .insert({
                    ID_Administrador: administrador.ID_Administrador,
                    P_Nombre: administrador.P_Nombre,
                    S_Nombre: administrador.S_Nombre,
                    P_Apellido: administrador.P_Apellido,
                    S_Apellido: administrador.S_Apellido,
                    Contrasena: hash, // Almacenar el hash en lugar de la contraseña en texto plano
                })
                .then((res) => {
                    console.log('Id del nuevo administrador: ', res[0]);
                    result(null, res[0]);
                })
                .catch((err) => {
                    console.error('Error al crear el administrador: ', err);
                    result(err, null);
                });
        }
    });
};

module.exports = administradorcreate;

