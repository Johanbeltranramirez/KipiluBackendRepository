const knex = require('../../config/db/db');

const formularioIdModel = {};

formularioIdModel.getById = (formularioId, result) => {
    knex.select('*').from('Formularios').where('ID_Formulario', formularioId)
        .then((formulario) => {
            if (formulario.length) {
                console.log('Formulario obtenido correctamente: ', formulario[0]);
                result(null, formulario[0]);
            } else {
                console.log('Formulario no encontrado');
                result({ message: 'Formulario no encontrado' }, null);
            }
        })
        .catch((err) => {
            console.log('Error al obtener el formulario por ID: ', err);
            result(err, null);
        });
};

module.exports = formularioIdModel;
