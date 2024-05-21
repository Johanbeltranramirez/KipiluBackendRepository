const db = require('../config/config');

const userid = {};

userid.searchById = (busqueda, result) => {
  const sql = `
    SELECT ID_Adoptante, P_Nombre, S_Nombre, P_Apellido, S_Apellido, Correo, Direccion, Telefono 
    FROM adoptantes 
    WHERE ID_Adoptante LIKE ?
  `;

  const queryParam = `%${busqueda}%`;

  db.query(sql, [queryParam], (err, res) => {
    if (err) {
      console.log('Error al buscar adoptantes por ID: ', err);
      result(err, null);
    } else {
      console.log('Adoptantes encontrados: ', res);
      result(null, res);
    }
  });
};

module.exports = userid;