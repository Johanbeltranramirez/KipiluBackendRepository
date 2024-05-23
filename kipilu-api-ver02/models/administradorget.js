const db = require('../config/config');

const administradorget = {};

administradorget.getAll = (result) => {
    const sql = `SELECT * FROM administradores`;

    db.query(sql, (err, administradores) => {
        if (err) {
            console.log('Error al obtener adoptantes: ', err);
            result(err, null);
        } else {
            console.log('Administradores obtenidos correctamente: ', administradores);
            result(null,administradores);
        }
    });
};

administradorget.getById = (administradorId, result) => {
    const sql = `SELECT * FROM administradores WHERE ID_Administrador = ?`;

    db.query(sql, [administradorId], (err,administrador) => {
        if (err) {
            console.log('Error al obtener administrador: ', err);
            result(err, null);
        } else {
            if (administrador.length) {
                console.log('Administrador obtenidos correctamente correctamente:', administrador[0]);
                result(null,administrador[0]);
            } else {
                console.log('Administrador no encontrado');
            result({ message: 'Administrador no encontrado'}, null);
            }
        }
    });
};

module.exports = administradorget;