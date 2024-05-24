const knex = require('../../config/db/db');

const comentaristaPost = {};

comentaristaPost.create = (comentarista, result) => {
    knex('Comentaristas')
        .insert({
            Nombre: comentarista.Nombre,
            Apellido: comentarista.Apellido,
            Comentario: comentarista.Comentario
        })
        .then((res) => {
            console.log('Id del nuevo comentario: ', res[0]); // En Knex, res es un array con los IDs insertados
            result(null, res[0]);
        })
        .catch((err) => {
            console.log('Error al crear el comentarista: ', err);
            result(err, null);
        });
};

module.exports = comentaristaPost;