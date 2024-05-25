const knex = require('../../config/db/db');

const formularios = {};

formularios.create = (formulariosData, result) => {
    const { Adoptante, Animal } = formulariosData; // Extraemos Adoptante y Animal de los datos del formulario

    // Definimos los valores predeterminados para Validacion_donativo, Estado_solicitud y Administrador
    const defaultValues = {
        Validacion_donativo: 'NA',
        Estado_solicitud: 3,
        Administrador: 'CC19029900'
    };

    // Combinamos los valores predeterminados con los datos del formulario
    const formData = { ...formulariosData, ...defaultValues };

    knex('formularios')
        .insert({
            Adoptante: Adoptante,
            Animal: Animal,
            ...formData  // Insertamos todos los datos del formulario
        })
        .then((res) => {
            console.log('Id del nuevo formulario: ', res[0]);
            result(null, res[0]);
        })
        .catch((err) => {
            console.error('Error al crear el formulario: ', err);
            result(err, null);
        });
};

module.exports = formularios;
