const db = require('../config/config');

const administrador_update = {};

// Método para actualizar un administrador por su ID
administrador_update.update = (administradorId, administradorData, result) => {
    const { P_Nombre, S_Nombre, P_Apellido, S_Apellido, Contrasena } = administradorData;

    const sql = `
    UPDATE administradores
    SET 
        P_Nombre = ?,
        S_Nombre = ?,
        P_Apellido = ?,
        S_Apellido = ?,
        Contrasena = ?
    WHERE 
        ID_Administrador = ?
    `;

    db.query(sql, [P_Nombre, S_Nombre, P_Apellido, S_Apellido, Contrasena, administradorId], (err, res) => {
        if (err) {
            console.error('Error al actualizar el administrador:', err);
            result(err, null);
            return;
        }

        if (res.affectedRows === 0) {
            // No se encontró el administrador con el ID proporcionado
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('Administrador actualizado correctamente');
        result(null, { message: 'Administrador actualizado correctamente' });
    });
};

module.exports = administrador_update;
