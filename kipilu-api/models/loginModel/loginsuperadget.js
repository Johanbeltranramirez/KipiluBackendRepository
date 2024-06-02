const knex = require('../../config/db/db');

const loginsuperadget = {};

loginsuperadget.verifyCredentials = (ID_Superadmin, Contrasena, result) => {
    knex.select('ID_Superadmin', 'Contrasena')
        .from('Super_admins')
        .where({
            ID_Superadmin: ID_Superadmin,
            Contrasena: Contrasena
        })
        .then((res) => {
            if (res.length > 0) {
                console.log('Superadmin encontrado: ', res[0]);
                result(null, res[0]);
            } else {
                console.log('Superadmin no encontrado o contraseña incorrecta.');
                result(null, null);
            }
        })
        .catch((err) => {
            console.log('Error al verificar las credenciales del Superadmin: ', err);
            result(err, null);
        });
};

module.exports = loginsuperadget;
