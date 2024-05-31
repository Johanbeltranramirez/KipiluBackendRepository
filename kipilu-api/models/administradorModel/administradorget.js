const knex = require('../../config/db/db');

const administradorget = {};

administradorget.getAll = (result) => {
    knex.select('*').from('administradores')
        .then((administradores) => {
            console.log('Administradores obtenidos correctamente: ', administradores);
            result(null, administradores);
        })
        .catch((err) => {
            console.log('Error al obtener administradores: ', err);
            result(err, null);
        });
};

administradorget.getById = (administradorId, result) => {
    knex.select('*').from('administradores').where('ID_Administrador', administradorId)
        .then((administrador) => {
            if (administrador.length) {
                console.log('Administrador obtenido correctamente:', administrador[0]);
                result(null, administrador[0]);
            } else {
                console.log('Administrador no encontrado');
                result({ message: 'Administrador no encontrado' }, null);
            }
        })
        .catch((err) => {
            console.log('Error al obtener administrador: ', err);
            result(err, null);
        });
};

module.exports = administradorget;