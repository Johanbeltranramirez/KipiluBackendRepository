const knex = require('../../../config/db/db');

const loginget = {};

loginget.verifyCredentials = (ID_Administrador, Contrasena, result) => {
    knex.select('ID_Administrador', 'Contrasena')
        .from('Administradores')
        .where({
            ID_Administrador: ID_Administrador,
            Contrasena: Contrasena
        })
        .then((res) => {
            if (res.length > 0) {
                console.log('Administrador encontrado: ', res[0]);
                result(null, res[0]);
            } else {
                console.log('Administrador no encontrado o contraseña incorrecta.');
                result(null, null);
            }
        })
        .catch((err) => {
            console.log('Error al verificar las credenciales del administrador: ', err);
            result(err, null);
        });
};

module.exports = loginget;
