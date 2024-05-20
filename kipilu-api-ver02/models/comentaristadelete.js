const db = require('../config/config');

const comentaristaDel = {};

// Método para eliminar un comentario por su ID
comentaristaDel.delete = (commentId, result) => {
  const sql = `
    DELETE FROM comentaristas
    WHERE ID_Comentario = ?
  `;

  db.query(sql, [commentId], (err, res) => {
    if (err) {
      console.log('Error al eliminar el comentario: ', err);
      result(err, null);
    } else {
      console.log('Comentario eliminado correctamente');
      result(null, { message: 'Comentario eliminado correctamente' });
    }
  });
};

module.exports = comentaristaDel;