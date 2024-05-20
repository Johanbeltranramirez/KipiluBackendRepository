const db = require('../config/config');

const formulariocreate = {};

formulariocreate.create = (formularios, result) => {
  const sql = `
    INSERT INTO formularios (
      Adoptante,
      Animal,
      Validacion_donativo,
      Estado_solicitud,
      Administrador
    ) VALUES (?, 1, 'N/A', 3, 'CC1027524883')
  `;

  db.query(
    sql,
    [
      formularios.Adoptante,
      formularios.Animal,
      formularios.Validacion_donativo,
      formularios.Estado_solicitud,
      formularios.Administrador,
    ],
    (err, res) => {
      if (err) {
        console.error('Error al crear el formularios: ', err);
        result(err, null);
      } else {
        console.log('Id del nuevo formularios: ', res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

module.exports = formulariocreate;
