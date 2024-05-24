const knex = require('../../config/db/db');

const administradorid = {};

administradorid.searchById = (busqueda, result) => {
    knex.select('ID_Administrador', 'P_Nombre', 'S_Nombre', 'P_Apellido', 'S_Apellido')
        .from('administradores')
        .where('ID_Administrador', 'like', `%${busqueda}%`)
        .then((res) => {
            console.log('Administradores encontrados: ', res);
            result(null, res);
        })
        .catch((err) => {
            console.log('Error al buscar administradores por ID: ', err);
            result(err, null);
        });
};

module.exports = administradorid;