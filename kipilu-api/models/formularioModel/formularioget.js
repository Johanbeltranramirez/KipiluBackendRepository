const knex = require('../../config/db/db');

const formularioget = {};

formularioget.getAll = (result) => {
    knex.select('*').from('formularios')
        .then((forms) => {
            console.log('Formularios obtenidos correctamente: ', forms);
            result(null, forms);
        })
        .catch((err) => {
            console.log('Error al obtener formularios: ', err);
            result(err, null);
        });
};

module.exports = formularioget;