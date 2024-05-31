const knex = require('../../config/db/db');

const AnimalAlter = {};

AnimalAlter.updateStateById = (animalId, result) => {
    knex('Animales')
        .where({ ID_Animal: animalId })
        .update({ Estado_Animal: 3 }) // Cambiar el estado del animal a "En Proceso de Adopción"
        .then((res) => {
            console.log('Estado del animal actualizado correctamente.');
            result(null, res);
        })
        .catch((err) => {
            console.log('Error al actualizar el estado del animal: ', err);
            result(err, null);
        });
};

module.exports = AnimalAlter;
