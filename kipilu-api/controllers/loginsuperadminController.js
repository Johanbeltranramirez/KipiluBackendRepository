const loginsuperadget = require('../models/loginModel/loginsuperadget');
const loginsuperadgetcred = require('../models/loginModel/loginsuperadgetcred');
const loginsuperadupdate = require('../models/loginModel/loginsuperadupdate');

module.exports = {
    login(req, res) {
        const { ID_Superadmin, Contrasena } = req.body; // Datos de las credenciales del superadmin

        if (!ID_Superadmin || !Contrasena) {
            return res.status(400).json({
                success: false,
                message: 'ID del superadmin y Contrasena son requeridos'
            });
        }

        loginsuperadget.verifyCredentials(ID_Superadmin, Contrasena, (err, superadmin) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error al verificar las credenciales del superadmin',
                    error: err
                });
            }

            if (!superadmin) {
                return res.status(401).json({
                    success: false,
                    message: 'ID_Superadmin o Contrasena incorrectos'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Superadmin autenticado correctamente',
                data: superadmin
            });
        });
    },

    async verifyAndUpdatePassword(req, res) {
        const { ID_Superadmin, Correo, Telefono, newPassword } = req.body;

        if (!ID_Superadmin || !Correo || !Telefono || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'ID_Superadmin, Correo, Telefono y nueva contraseña son requeridos'
            });
        }

        loginsuperadgetcred.verifyCredentials(ID_Superadmin, Correo, Telefono, async (err, superadmin) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error al verificar los datos del superadmin',
                    error: err
                });
            }

            if (!superadmin) {
                return res.status(401).json({
                    success: false,
                    message: 'ID_Superadmin, Correo o Telefono incorrectos'
                });
            }

            try {
                const updated = await loginsuperadupdate.updatePassword(ID_Superadmin, newPassword);
                if (updated) {
                    res.status(200).json({
                        success: true,
                        message: 'Contraseña actualizada correctamente'
                    });
                } else {
                    res.status(404).json({
                        success: false,
                        message: 'Superadmin no encontrado o datos incorrectos'
                    });
                }
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Error al actualizar la contraseña',
                    error: error.message
                });
            }
        });
    }
};
