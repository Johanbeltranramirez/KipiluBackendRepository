const knex = require('../../config/db/db');

const formulariodelete = {};

// Método para eliminar un formulario por su ID
formulariodelete.delete = (IdForm, result) => {
    knex('formularios')
        .where('ID_Formulario', IdForm)
        .del()
        .then(() => {
            console.log('Formulario eliminado correctamente');
            result(null, { message: 'Formulario eliminado correctamente' });
        })
        .catch((err) => {
            console.log('Error al eliminar el formulario: ', err);
            result(err, null);
        });
};

module.exports = formulariodelete;
