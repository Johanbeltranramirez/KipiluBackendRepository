const knex = require('../../config/db/db');

const animalget = {};

animalget.getAll = (result) => {
    knex.select('*').from('animales')
        .then((animals) => {
            console.log('Animales obtenidos correctamente: ', animals);
            result(null, animals);
        })
        .catch((err) => {
            console.log('Error al obtener animales: ', err);
            result(err, null);
        });
};

animalget.getById = (animalId, result) => {
    knex.select('*').from('animales').where('ID_Animal', animalId)
        .then((animal) => {
            if (animal.length) {
                console.log('Animal obtenido correctamente: ', animal[0]);
                result(null, animal[0]);
            } else {
                console.log('Animal no encontrado');
                result({ message: 'Animal no encontrado' }, null);
            }
        })
        .catch((err) => {
            console.log('Error al obtener el animal por ID: ', err);
            result(err, null);
        });
};

module.exports = animalget;
