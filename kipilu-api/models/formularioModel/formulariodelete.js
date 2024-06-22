const knex = require('../../config/db/db');

const formulariodelete = {};

// Método para eliminar un formulario por su ID solo si está en estado "Aprobado" o "No Aprobado"
formulariodelete.delete = (IdForm, result) => {
    knex('formularios')
        .where('ID_Formulario', IdForm)
        .whereIn('ID_Solicitud', function() {
            this.select('ID_Solicitud').from('Estados_Solicitudes').whereIn('Estado_Solicitud', ['Aprobado', 'No Aprobado']);
        })
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
