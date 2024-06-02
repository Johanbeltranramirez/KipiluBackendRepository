const loginget = require('../models/loginModel/loginadminget');

module.exports = {
    login(req, res) {
        const { ID_Administrador, Contrasena } = req.body; // Datos de las credenciales del administrador

        if (!ID_Administrador || !Contrasena) {
            return res.status(400).json({
                success: false,
                message: 'ID_Administrador y Contrasena son requeridos'
            });
        }

        loginget.verifyCredentials(ID_Administrador, Contrasena, (err, administrador) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error al verificar las credenciales del administrador',
                    error: err
                });
            }

            if (!administrador) {
                return res.status(401).json({
                    success: false,
                    message: 'ID_Administrador o Contrasena incorrectos'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Administrador autenticado correctamente',
                data: administrador
            });
        });
    }
};
