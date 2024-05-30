const knex = require('../../config/db/db');

const Animal = {};

Animal.create = (animal, result) => {
    knex('Animales')
        .insert({
            Nombre_Animal: animal.Nombre_Animal,
            Razas: animal.Razas,
            Sexo: animal.Sexo,
            Foto: animal.Foto,
            Descripcion: animal.Descripcion,
            Especie_Animal: animal.Especie_Animal,
            Estado_Animal: animal.Estado_Animal
        })
        .then((res) => {
            console.log('Id del nuevo animal: ', res[0]);
            result(null, res[0]);
        })
        .catch((err) => {
            console.log('Error al crear el animal: ', err);
            result(err, null);
        });
};

module.exports = Animal;
