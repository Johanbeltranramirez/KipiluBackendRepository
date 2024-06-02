const knex = require('../../config/db/db');

const loginsuperadgetcred = {};

loginsuperadgetcred.verifyCredentials = (ID_Superadmin, Correo, Telefono, result) => {
    knex.select('ID_Superadmin', 'Correo', 'Telefono')
        .from('Super_admins')
        .where({
            ID_Superadmin: ID_Superadmin,
            Correo: Correo,
            Telefono: Telefono
        })
        .then((res) => {
            if (res.length > 0) {
                console.log('Superadmin encontrado: ', res[0]);
                result(null, res[0]);
            } else {
                console.log('Superadmin no encontrado o datos incorrectos.');
                result(null, null);
            }
        })
        .catch((err) => {
            console.log('Error al verificar las credenciales del Superadmin: ', err);
            result(err, null);
        });
};

module.exports = loginsuperadgetcred;
