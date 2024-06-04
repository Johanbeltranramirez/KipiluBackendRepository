const knex = require('../../config/db/db');
const bcrypt = require('bcrypt');

const loginsuperadget = {};

loginsuperadget.verifyCredentials = (ID_Superadmin, Contrasena, result) => {
    knex.select('ID_Superadmin', 'Contrasena')
        .from('Super_admins')
        .where('ID_Superadmin', ID_Superadmin)
        .then(async (res) => {
            if (res.length > 0) {
                const superAdmin = res[0];
                const match = await bcrypt.compare(Contrasena, superAdmin.Contrasena);
                if (match) {
                    console.log('Superadmin encontrado: ', superAdmin);
                    result(null, superAdmin);
                } else {
                    console.log('Contraseña incorrecta.');
                    result(null, null);
                }
            } else {
                console.log('Superadmin no encontrado.');
                result(null, null);
            }
        })
        .catch((err) => {
            console.log('Error al verificar las credenciales del Superadmin: ', err);
            result(err, null);
        });
};

module.exports = loginsuperadget;
