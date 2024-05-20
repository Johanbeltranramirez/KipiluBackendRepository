const db = require('../config/config');

const formulariodelete = {};

// Método para eliminar un formularios por medio de su ID
formulariodelete.delete = (IdForm, result) => {
  const sql = `
    DELETE FROM formularios
    WHERE ID_Formulario = ?
  `;

  db.query(sql, [IdForm], (err, res) => {
    if (err) {
      console.log('Error al eliminar el formularios: ', err);
      result(err, null);
    } else {
      console.log('formularios eliminado correctamente');
      result(null, { message: 'formularios eliminado correctamente' });
    }
  });
};

module.exports = formulariodelete;