

   const knex = require('../../config/db/db');

const formularioget = {};

formularioget.getAll = (result) => {
    knex.select('*').from('formularios')
        .then((forms) => {
            console.log('Formularios obtenidos correctamente: ', forms);
            result(null, forms);
        })
        .catch((err) => {
            console.log('Error al obtener formularios: ', err);
            result(err, null);
        });
};

formularioget.getById = (IdForm, result) => {
    knex.select('*').from('formularios').where('ID_Formulario', IdForm)
        .then((formularios) => {
            if (formularios.length) {
                console.log('Formulario obtenido correctamente: ', formularios[0]);
                result(null, formularios[0]);
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

module.exports = formularioget;
