const db = require('../config/config');

const user_delete = {};

// Método para eliminar un adoptante por su ID
user_delete.delete = (adoptanteId, result) => {
  const sql = `
    DELETE FROM Adoptantes
    WHERE ID_Adoptante = ?
  `;

  db.query(sql, [adoptanteId], (err, res) => {
    if (err) {
      console.log('Error al eliminar el adoptante: ', err);
      result(err, null);
    } else {
      console.log('Adoptante eliminado correctamente');
      result(null, { message: 'Adoptante eliminado correctamente' });
    }
  });
};

module.exports = user_delete;
