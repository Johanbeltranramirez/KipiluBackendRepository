const knex = require('../../config/db/db');

const formularios = {};

formularios.create = (formulariosData, result) => {
    console.log(JSON.stringify(formulariosData, null, 2));
    const { ID_Adoptante, ID_Animal } = formulariosData; // Extraemos Adoptante y Animal de los datos del formulario

    // Verifica que los valores de Adoptante y Animal no sean nulos o indefinidos
    if (!ID_Adoptante || !ID_Animal) {
        const error = new Error('El campo Adoptante y Animal son obligatorios');
        console.error('Error al crear el formulario: ', error);
        result(error, null);
        return;
    }

    // Definimos los valores predeterminados para Validacion_donativo, Estado_solicitud y Administrador
    const defaultValues = {
        Validacion_donativo: 'NA',
        Estado_solicitud: 3,
        Administrador: 'Form'
    };

    // Combinamos los valores predeterminados con los datos del formulario
    const formData = { ...defaultValues, ID_Adoptante, ID_Animal };

    knex('formularios')
        .insert(formData)
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
