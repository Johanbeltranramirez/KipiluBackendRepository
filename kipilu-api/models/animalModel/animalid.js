const knex = require('../../config/db/db');

const Animalid = {};

Animalid.selectAllBySpecies = (especieId, result) => {
    knex.select('Animales.*', 'Especies.Especie_Animal', 'Razas.Nombre_Raza')
        .from('Animales')
        .innerJoin('Especies', 'Animales.Especie_Animal', 'Especies.ID_Especie')
        .innerJoin('Razas', 'Animales.Razas', 'Razas.ID_Raza')
        .where('Animales.Especie_Animal', especieId)
        .whereNot('Animales.Estado_Animal', 1)
        .then((res) => {
            console.log('Animales seleccionados por especie: ', res);
            result(null, res);
        })
        .catch((err) => {
            console.log('Error al seleccionar los animales por especie: ', err);
            result(err, null);
        });
};

module.exports = Animalid;
