const db = require('../config/config');

const Raza = {};

Raza.create = (raza, result) => {
  const sql = `
    INSERT INTO Razas (Nombre_Raza)
    VALUES (?)
  `;

  db.query(
    sql,
    [raza.Nombre_Raza],
    (err, res) => {
      if (err) {
        console.log('Error al crear la raza: ', err);
        result(err, null);
      } else {
        console.log('Id de la nueva raza: ', res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

module.exports = Raza;
