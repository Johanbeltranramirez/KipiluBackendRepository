const knex = require('../../config/db/db');

const administradorcreate = {};

administradorcreate.create = (administrador, result) => {
    knex('administradores')
        .insert({
            ID_Administrador: administrador.ID_Administrador,
            P_Nombre: administrador.P_Nombre,
            S_Nombre: administrador.S_Nombre,
            P_Apellido: administrador.P_Apellido,
            S_Apellido: administrador.S_Apellido,
            Contrasena: administrador.Contrasena
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

module.exports = administradorcreate; 