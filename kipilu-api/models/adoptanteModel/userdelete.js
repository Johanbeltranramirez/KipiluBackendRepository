const knex = require('../../config/db/db');

const user_delete = {};

// Método para eliminar un adoptante por su ID
user_delete.delete = (adoptanteId, result) => {
    knex('Adoptantes')
        .where('ID_Adoptante', adoptanteId)
        .del()
        .then((res) => {
            console.log('Adoptante eliminado correctamente');
            result(null, { message: 'Adoptante eliminado correctamente' });
        })
        .catch((err) => {
            console.log('Error al eliminar el adoptante: ', err);
            result(err, null);
        });
};

module.exports = user_delete;
