const knex = require('../../config/db/db');

const formularioupdate = {};

// Método para actualizar un formulario por su ID
formularioupdate.update = (IdForm, FormData, result) => {
    const { ID_Adoptante, ID_Animal, Validacion_donativo, Estado_solicitud, Administrador } = FormData;

    knex('Formularios') // Asegúrate de que el nombre de la tabla coincida exactamente con el de la base de datos
        .where('ID_Formulario', IdForm)
        .update({
            ID_Adoptante: ID_Adoptante,
            ID_Animal: ID_Animal,
            Validacion_donativo: Validacion_donativo,
            Estado_solicitud: Estado_solicitud,
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
