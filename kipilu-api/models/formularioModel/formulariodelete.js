const knex = require('../../config/db/db');

const formulariodelete = {};

// Método para eliminar un formulario por su ID solo si está en estado "Aprobado" o "No Aprobado"
formulariodelete.delete = (IdForm, result) => {
    knex('Formularios')
        .select('Estado_solicitud')
        .where('ID_Formulario', IdForm)
        .first()
        .then((formulario) => {
            if (!formulario) {
                return Promise.reject({ message: 'Formulario no encontrado' });
            }

            if (formulario.Estado_solicitud === 3) { // Estado_solicitud 3 es 'Pendiente'
                return Promise.reject({ message: 'No se puede eliminar un formulario en estado Pendiente' });
            }

            return knex('Formularios')
                .where('ID_Formulario', IdForm)
                .whereIn('Estado_solicitud', function() {
                    this.select('ID_Solicitud').from('Estados_Solicitudes').whereIn('Estado_Solicitud', ['Aprobado', 'No Aprobado']);
                })
                .del();
        })
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
