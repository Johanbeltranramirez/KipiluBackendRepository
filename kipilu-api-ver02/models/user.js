const db = require('../config/config');

const Adoptante = {};

Adoptante.create = (adoptante, result) => {
  const sql = `
    INSERT INTO Adoptantes (
      ID_Adoptante,
      P_Nombre,
      S_Nombre,
      P_Apellido,
      S_Apellido,
      Correo,
      Direccion,
      Telefono
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      adoptante.ID_Adoptante,
      adoptante.P_Nombre,
      adoptante.S_Nombre,
      adoptante.P_Apellido,
      adoptante.S_Apellido,
      adoptante.Correo,
      adoptante.Direccion,
      adoptante.Telefono,
    ],
    (err, res) => {
      if (err) {
        console.log('Error al crear el adoptante: ', err);
        result(err, null);
      } else {
        console.log('Id del nuevo adoptante: ', res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

module.exports = Adoptante;

