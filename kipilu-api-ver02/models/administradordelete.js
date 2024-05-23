const db = require('../config/config');

const AdministradorDel = {};

//Metodo para eliminar un animal por ID
AdministradorDel.delete = (administradorId, result) => {
    const sql = ` 
    DELETE FROM administradores
    WHERE ID_Administrador = ?
    `;

    db.query(sql, [administradorId], (err, res) => {
        if (err) {
            console.log('Error al eliminar el administrador: ', err);
            result(err, null);
        } else {
            console.log('Administrador eliminado correctamente: ');
            result(null, { message: 'Administrador eliminado correctamente'});
        }
    });
};

module.exports = AdministradorDel;