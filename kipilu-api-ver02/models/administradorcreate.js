const db = require('../config/config');

const administradorcreate = {};

administradorcreate.create = (administrador, result) => {
    const sql = `
        INSERT INTO administradores (
            ID_Administrador, 
            P_Nombre,
            S_Nombre, 
            P_Apellido,
            S_Apellido,
            Contrasena
        ) VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql, 
        [
            administrador.ID_Administrador,
            administrador.P_Nombre,
            administrador.S_Nombre,
            administrador.P_Apellido,
            administrador.S_Apellido,
            administrador.Contrasena,
        ],
        (err, res) => {
            if (err) {
                console.error('Error al crear el administrador: ', err);
                result(err, null);
            } else {
                console.log('Id del nuevo administrador: ', res.insertId);
                result|(null, res.insertId);
            }
        }
    );
}

module.exports = administradorcreate; 