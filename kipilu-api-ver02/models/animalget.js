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

animalget.getById = (animalId, result) => {
  const sql = `SELECT * FROM animales WHERE ID_Animal = ?`;

  db.query(sql, [animalId], (err, animal) => {
    if (err) {
      console.log('Error al obtener el animal por ID: ', err);
      result(err, null);
    } else {
      if (animal.length) {
        console.log('Animal obtenido correctamente: ', animal[0]);
        result(null, animal[0]);
      } else {
        console.log('Animal no encontrado');
        result({ message: 'Animal no encontrado' }, null);
      }
    }
  });
};

module.exports = animalget;
