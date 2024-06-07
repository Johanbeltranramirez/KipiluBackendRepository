const knex = require('../../config/db/db');

const formularios = {};

formularios.create = (formulariosData, result) => {
    console.log('Datos recibidos:', JSON.stringify(formulariosData, null, 2));
    const { ID_Adoptante, ID_Animal } = formulariosData;

    if (!ID_Adoptante || !ID_Animal) {
        const error = new Error('El campo Adoptante y Animal son obligatorios');
        console.error('Error al crear el formulario: ', error.message);
        result(error, null);
        return;
    }

    const defaultValues = {
        Validacion_donativo: 'NA',
        Estado_solicitud: 3,
        Administrador: 'Form'
    };

    const formData = { ...defaultValues, ID_Adoptante, ID_Animal };
    console.log('Datos a insertar en la base de datos:', JSON.stringify(formData, null, 2));

    knex('formularios')
        .insert(formData)
        .then((res) => {
            console.log('Id del nuevo formulario: ', res[0]);
            result(null, res[0]);
        })
        .catch((err) => {
            console.error('Error al crear el formulario: ', err.message);
            result(err, null);
        });
};

module.exports = formularios;
