const db = require('../config/config');

const AnimalUpdate = {};

// Método para actualizar un animal por su ID
AnimalUpdate.update = (animalId, animalData, result) => {
  const { Nombre_Animal, Razas, Sexo, Foto, Descripcion, Especie_Animal, Estado_Animal } = animalData;
  
  const sql = `
    UPDATE Animales
    SET 
      Nombre_Animal = ?,
      Razas = ?,
      Sexo = ?,
      Foto = ?,
      Descripcion = ?,
      Especie_Animal = ?,
      Estado_Animal = ?
    WHERE ID_Animal = ?
  `;

  db.query(sql, [Nombre_Animal, Razas, Sexo, Foto, Descripcion, Especie_Animal, Estado_Animal, animalId], (err, res) => {
    if (err) {
      console.log('Error al actualizar el animal: ', err);
      result(err, null);
    } else {
      console.log('Animal actualizado correctamente');
      result(null, { message: 'Animal actualizado correctamente' });
    }
  });
};

module.exports = AnimalUpdate;
