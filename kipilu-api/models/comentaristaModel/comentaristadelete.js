const knex = require('../../config/db/db');

const comentaristaDel = {};

comentaristaDel.delete = (commentId, result) => {
    knex('Comentaristas')
        .where('ID_Comentario', commentId)
        .del()
        .then(() => {
            console.log('Comentario eliminado correctamente');
            result(null, { message: 'Comentario eliminado correctamente' });
        })
        .catch((err) => {
            console.log('Error al eliminar el comentario: ', err);
            result(err, null);
        });
};

module.exports = comentaristaDel;