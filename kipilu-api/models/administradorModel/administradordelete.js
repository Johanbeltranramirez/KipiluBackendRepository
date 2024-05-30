const knex = require('../../config/db/db');

const AdministradorDel = {};

// Método para eliminar un administrador por su ID
AdministradorDel.delete = (administradorId, result) => {
    knex('administradores')
        .where('ID_Administrador', administradorId)
        .del()
        .then(() => {
            console.log('Administrador eliminado correctamente');
            result(null, { message: 'Administrador eliminado correctamente' });
        })
        .catch((err) => {
            console.log('Error al eliminar el administrador: ', err);
            result(err, null);
        });
};

module.exports = AdministradorDel;