const knex = require('../../config/db/db');

const formularioupdate = {};

// Método para actualizar un formulario por su ID
formularioupdate.update = (IdForm, FormData, result) => {
    const { Adoptante, Animal, Validacion_Donativo, Estado_Solicitud, Administrador } = FormData;

    knex('formularios')
        .where('ID_Formulario', IdForm)
        .update({
            Adoptante: Adoptante,
            Animal: Animal,
            Validacion_donativo: Validacion_Donativo,
            Estado_solicitud: Estado_Solicitud,
            Administrador: Administrador
        })
        .then(() => {
            console.log('Formulario actualizado correctamente');
            result(null, { message: 'Formulario actualizado correctamente' });
        })
        .catch((err) => {
            console.log('Error al actualizar el formulario: ', err);
            result(err, null);
        });
};

module.exports = formularioupdate;
