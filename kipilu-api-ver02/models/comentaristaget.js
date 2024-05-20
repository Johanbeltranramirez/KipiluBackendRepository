const db = require('../config/config');

const comentaristaGet = {};

comentaristaGet.getAll = (result) => {
  const sql = `SELECT * FROM comentaristas`;

  db.query(sql, (err, comments) => {
    if (err) {
      console.log('Error al obtener comentarios: ', err);
      result(err, null);
    } else {
      console.log('Comentarios obtenidos correctamente: ', comments);
      result(null, comments);
    }
  });
};

module.exports = comentaristaGet;
