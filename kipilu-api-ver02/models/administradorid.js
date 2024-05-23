const db = require('../config/config');

const administradorid = {};

administradorid.searchById = (busqueda, result) => {
    const sql = `
    SELECT ID_Administrador, P_Nombre, S_Nombre, P_Apellido, S_Apellido
    FROM administradores
    WHERE ID_Administrador LIKE ?
    `;

    const queryParam = `%${busqueda}%`;

    db.query(sql, [queryParam], (err, res) => {
        if (err) {
            console.log('Error al buscar administradores por ID: ', err);
            result(err,null);
        } else {
            console.log('Administradores encontrados: ', res);
            result(null, res);
        }
    });
};

module.exports = administradorid;