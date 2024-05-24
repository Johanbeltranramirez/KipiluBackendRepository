const knex = require('../../config/db/db');

const administrador_update = {};

administrador_update.update = (administradorId, administradorData, result) => {
    const { P_Nombre, S_Nombre, P_Apellido, S_Apellido, Contrasena } = administradorData;

    knex('administradores')
        .where('ID_Administrador', administradorId)
        .update({
            P_Nombre: P_Nombre,
            S_Nombre: S_Nombre,
            P_Apellido: P_Apellido,
            S_Apellido: S_Apellido,
            Contrasena: Contrasena
        })
        .then((res) => {
            if (res === 0) {
                // No se encontró el administrador con el ID proporcionado
                result({ kind: 'not_found' }, null);
                return;
            }

            console.log('Administrador actualizado correctamente');
            result(null, { message: 'Administrador actualizado correctamente' });
        })
        .catch((err) => {
            console.error('Error al actualizar el administrador:', err);
            result(err, null);
        });
};

module.exports = administrador_update;