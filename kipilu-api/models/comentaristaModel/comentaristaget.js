const knex = require('../../config/db/db');

const comentaristaGet = {};

comentaristaGet.getAll = (result) => {
    knex.select('*').from('Comentaristas')
        .then((comments) => {
            console.log('Comentarios obtenidos correctamente: ', comments);
            result(null, comments);
        })
        .catch((err) => {
            console.log('Error al obtener comentarios: ', err);
            result(err, null);
        });
};

module.exports = comentaristaGet;
