const knex = require('../../config/db/db');

const AnimalDel = {};

// Método para eliminar un animal por su ID solo si está en estado "Adoptado"
AnimalDel.delete = (animalId, result) => {
    knex('Animales')
        .select('Estado_Animal')
        .where('ID_Animal', animalId)
        .first()
        .then((animal) => {
            if (!animal) {
                return Promise.reject({ message: 'Animal no encontrado' });
            }

            if (animal.Estado_Animal === 1) { // Estado_Animal 1 es 'Adoptado'
                return knex('Animales')
                    .where('ID_Animal', animalId)
                    .del();
            } else if (animal.Estado_Animal === 2) { // Estado_Animal 2 es 'No Adoptado'
                return Promise.reject({ message: 'No se puede eliminar un animal que no ha sido adoptado' });
            } else if (animal.Estado_Animal === 3) { // Estado_Animal 3 es 'En Proceso de Adopción'
                return Promise.reject({ message: 'No se puede eliminar un animal en proceso de adopción' });
            } else {
                return Promise.reject({ message: 'Estado del animal no reconocido' });
            }
        })
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
