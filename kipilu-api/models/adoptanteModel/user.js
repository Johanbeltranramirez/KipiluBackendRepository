const knex = require('../../config/db/db');

const Adoptante = {};

Adoptante.create = (adoptante, result) => {
    knex('Adoptantes')
        .insert({
            ID_Adoptante: adoptante.ID_Adoptante,
            P_Nombre: adoptante.P_Nombre,
            S_Nombre: adoptante.S_Nombre,
            P_Apellido: adoptante.P_Apellido,
            S_Apellido: adoptante.S_Apellido,
            Correo: adoptante.Correo,
            Direccion: adoptante.Direccion,
            Telefono: adoptante.Telefono,
        })
        .then((res) => {
            console.log('Id del nuevo adoptante: ', res[0]);
            result(null, res[0]);
        })
        .catch((err) => {
            console.log('Error al crear el adoptante: ', err);
            result(err, null);
        });
};

module.exports = Adoptante;
