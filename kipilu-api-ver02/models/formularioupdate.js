const db = require('../config/config');

const formularioupdate = {};

//Método para poder actualizar un formulario
formularioupdate.update = (IdForm, FormData, result) => {
  const { Adoptante, Animal, Validacion_Donativo, Estado_Solicitud, Administrador} = FormData;
  
  const sql = `
    UPDATE formularios
    SET 
      Adoptante = ?,
      Animal = ?,
      Validacion_Donativo = ?,
      Estado_Solicitud = ?,
      Administrador = ?
    WHERE ID_Formulario = ?
  `;

  db.query(sql, [Adoptante, Animal, Validacion_Donativo, Estado_Solicitud, Administrador, IdForm], (err, res) => {
    if (err) {
      console.log('Error al actualizar el formulario: ', err);
      result(err, null);
    } else {
      console.log('Formulario actualizado correctamente');
      result(null, { message: 'Formulario actualizado correctamente' });
    }
  });
};

module.exports = formularioupdate;
