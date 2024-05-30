const knex = require('../../config/db/db');

const userget = {};

userget.getAll = (result) => {
    knex('Adoptantes')
        .select('*')
        .then((adoptantes) => {
            console.log('Adoptantes obtenidos correctamente: ', adoptantes);
            result(null, adoptantes);
        })
        .catch((err) => {
            console.log('Error al obtener adoptantes: ', err);
            result(err, null);
        });
};

module.exports = userget;
