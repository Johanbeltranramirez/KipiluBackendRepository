const db = require('../config/config');

const AnimalDel = {};

// Método para eliminar un animal por su ID
AnimalDel.delete = (animalId, result) => {
  const sql = `
    DELETE FROM animales
    WHERE ID_Animal = ?
  `;

  db.query(sql, [animalId], (err, res) => {
    if (err) {
      console.log('Error al eliminar el animal: ', err);
      result(err, null);
    } else {
      console.log('Animal eliminado correctamente');
      result(null, { message: 'Animal eliminado correctamente' });
    }
  });
};

module.exports = AnimalDel;
