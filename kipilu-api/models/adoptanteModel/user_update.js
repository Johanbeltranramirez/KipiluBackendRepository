const knex = require('../../config/db/db');

const user_update = {};

// Método para actualizar un adoptante por su ID
user_update.update = (adoptanteId, adoptanteData, result) => {
    const { P_Nombre, S_Nombre, P_Apellido, S_Apellido, Correo, Direccion, Telefono } = adoptanteData;

    knex('Adoptantes')
        .where('ID_Adoptante', adoptanteId)
        .update({
            P_Nombre: P_Nombre,
            S_Nombre: S_Nombre,
            P_Apellido: P_Apellido,
            S_Apellido: S_Apellido,
            Correo: Correo,
            Direccion: Direccion,
            Telefono: Telefono
        })
        .then((res) => {
            console.log('Adoptante actualizado correctamente');
            result(null, { message: 'Adoptante actualizado correctamente' });
        })
        .catch((err) => {
            console.log('Error al actualizar el adoptante: ', err);
            result(err, null);
        });
};

module.exports = user_update;
