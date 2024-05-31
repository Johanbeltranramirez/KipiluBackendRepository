const knex = require('../../config/db/db');

const AnimalDel = {};

// Método para eliminar un animal por su ID
AnimalDel.delete = (animalId, result) => {
    knex('animales')
        .where('ID_Animal', animalId)
        .del()
        .then(() => {
            console.log('Animal eliminado correctamente');
            result(null, { message: 'Animal eliminado correctamente' });
        })
        .catch((err) => {
            console.log('Error al eliminar el animal: ', err);
            result(err, null);
        });
};

module.exports = AnimalDel;
