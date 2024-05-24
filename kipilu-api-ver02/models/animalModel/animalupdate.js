const knex = require('../../config/db/db');

const AnimalUpdate = {};

// Método para actualizar un animal por su ID
AnimalUpdate.update = (animalId, animalData, result) => {
    const { Nombre_Animal, Razas, Sexo, Foto, Descripcion, Especie_Animal, Estado_Animal } = animalData;

    knex('Animales')
        .where('ID_Animal', animalId)
        .update({
            Nombre_Animal: Nombre_Animal,
            Razas: Razas,
            Sexo: Sexo,
            Foto: Foto,
            Descripcion: Descripcion,
            Especie_Animal: Especie_Animal,
            Estado_Animal: Estado_Animal
        })
        .then(() => {
            console.log('Animal actualizado correctamente');
            result(null, { message: 'Animal actualizado correctamente' });
        })
        .catch((err) => {
            console.log('Error al actualizar el animal: ', err);
            result(err, null);
        });
};

module.exports = AnimalUpdate;
