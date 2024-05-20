const db = require('../config/config');

const AdoptanteUpdate = {};

// Método para actualizar un adoptante por su ID
AdoptanteUpdate.update = (adoptanteId, adoptanteData, result) => {
  const { P_Nombre, S_Nombre, P_Apellido, S_Apellido, Correo, Direccion, Telefono } = adoptanteData;
  
  const sql = `
    UPDATE Adoptantes
    SET 
      P_Nombre = ?,
      S_Nombre = ?,
      P_Apellido = ?,
      S_Apellido = ?,
      Correo = ?,
      Direccion = ?,
      Telefono = ?
    WHERE ID_Adoptante = ?
  `;

  db.query(sql, [P_Nombre, S_Nombre, P_Apellido, S_Apellido, Correo, Direccion, Telefono, adoptanteId], (err, res) => {
    if (err) {
      console.log('Error al actualizar el adoptante: ', err);
      result(err, null);
    } else {
      console.log('Adoptante actualizado correctamente');
      result(null, { message: 'Adoptante actualizado correctamente' });
    }
  });
};

module.exports = AdoptanteUpdate;

