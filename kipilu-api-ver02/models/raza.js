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

Raza.getAll = (result) => {
  const sql = `
    SELECT * FROM Razas
  `;

  db.query(sql, (err, res) => {
    if (err) {
      console.log('Error al obtener las razas: ', err);
      result(err, null);
    } else {
      const razas = res.map((raza) => {
        return {
          ID_Raza: raza.ID_Raza,
          Nombre_Raza: raza.Nombre_Raza
        };
      });
      result(null, razas);
    }
  });
};

module.exports = Raza;
