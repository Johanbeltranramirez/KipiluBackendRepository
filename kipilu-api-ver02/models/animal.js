const db = require('../config/config');

const Animal = {};

Animal.create = (animal, result) => {
  const sql = `
    INSERT INTO Animales (
      Nombre_Animal,
      Razas,
      Sexo,
      Foto,
      Descripcion,
      Especie_Animal,
      Estado_Animal
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      animal.Nombre_Animal,
      animal.Razas,
      animal.Sexo,
      animal.Foto,
      animal.Descripcion,
      animal.Especie_Animal,
      animal.Estado_Animal,
    ],
    (err, res) => {
      if (err) {
        console.log('Error al crear el animal: ', err);
        result(err, null);
      } else {
        console.log('Id del nuevo animal: ', res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

module.exports = Animal;
