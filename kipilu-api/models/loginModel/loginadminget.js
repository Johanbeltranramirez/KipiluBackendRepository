const knex = require('../../config/db/db');
const bcrypt = require('bcrypt');

const loginget = {};

loginget.verifyCredentials = (ID_Administrador, Contrasena, result) => {
    knex.select('ID_Administrador', 'Contrasena')
        .from('Administradores')
        .where('ID_Administrador', ID_Administrador)
        .then(async (res) => {
            if (res.length > 0) {
                const admin = res[0];
                const match = await bcrypt.compare(Contrasena, admin.Contrasena);
                if (match) {
                    console.log('Administrador encontrado: ', admin);
                    result(null, admin);
                } else {
                    console.log('Contraseña incorrecta.');
                    result(null, null);
                }
            } else {
                console.log('Administrador no encontrado.');
                result(null, null);
            }
        })
        .catch((err) => {
            console.log('Error al verificar las credenciales del administrador: ', err);
            result(err, null);
        });
};

module.exports = loginget;

