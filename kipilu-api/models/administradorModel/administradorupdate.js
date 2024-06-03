const bcrypt = require('bcrypt');
const knex = require('../../config/db/db');

const administrador_update = {};

administrador_update.update = (administradorId, administradorData, result) => {
    const { P_Nombre, S_Nombre, P_Apellido, S_Apellido, Contrasena } = administradorData;

    if (Contrasena) {
        // Generar el hash de la nueva contraseña
        bcrypt.hash(Contrasena, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error al generar el hash de la contraseña:', err);
                result(err, null);
                return;
            }

            // Actualizar el administrador en la base de datos con la contraseña encriptada y el hash
            knex('administradores')
                .where('ID_Administrador', administradorId)
                .update({
                    P_Nombre: P_Nombre,
                    S_Nombre: S_Nombre,
                    P_Apellido: P_Apellido,
                    S_Apellido: S_Apellido,
                    Contrasena: hashedPassword, // Usar la contraseña encriptada
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
        });
    } else {
        // Actualizar el administrador en la base de datos sin cambiar la contraseña
        knex('administradores')
            .where('ID_Administrador', administradorId)
            .update({
                P_Nombre: P_Nombre,
                S_Nombre: S_Nombre,
                P_Apellido: P_Apellido,
                S_Apellido: S_Apellido
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
    }
};

module.exports = administrador_update;
