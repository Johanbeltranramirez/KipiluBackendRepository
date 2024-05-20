const db = require('../config/config');

const userget = {};

userget.getAll = (result) => {
  const sql = `SELECT * FROM adoptantes`;

  db.query(sql, (err, adoptantes) => {
    if (err) {
      console.log('Error al obtener adoptantes: ', err);
      result(err, null);
    } else {
      console.log('Adoptantes obtenidos correctamente: ', adoptantes);
      result(null, adoptantes);
    }
  });
};

module.exports = userget;
