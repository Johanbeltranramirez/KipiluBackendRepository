const db = require('../config/config');

const formularioget = {};

formularioget.getAll = (result) => {
  const sql = `SELECT * FROM formularios`;

  db.query(sql, (err, forms) => {
    if (err) {
      console.log('Error al obtener formularios: ', err);
      result(err, null);
    } else {
      console.log('Formularios obtenidos correctamente: ', forms);
      result(null, forms);
    }
  });
};

module.exports = formularioget;
