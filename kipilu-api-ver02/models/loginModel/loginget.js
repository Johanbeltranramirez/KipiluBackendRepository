const knex = require('../../config/db/db');

const loginGet = {}; 

loginGet.getAll = (result) => {
    knex.select('ID_Administrador', 'Contrasena').from('Administradores') // Cambio de '*' a las columnas deseadas
        .then((logins) => { 
            console.log('Contraseñas obtenidas correctamente:', logins);
            result(null, logins);
        })
        .catch((err) => {
            console.error('Error al obtener administradores:', err);
            result(err, null);
        });
};

module.exports = loginGet;
