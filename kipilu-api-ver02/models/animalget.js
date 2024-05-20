const db = require('../config/config');

const animalget = {};

animalget.getAll = (result) => {
  const sql = `SELECT * FROM animales`;

  db.query(sql, (err, animals) => {
    if (err) {
      console.log('Error al obtener animales: ', err);
      result(err, null);
    } else {
      console.log('Animales obtenidos correctamente: ', animals);
      result(null, animals);
    }
  });
};

module.exports = animalget;
