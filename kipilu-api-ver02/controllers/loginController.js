const loginGet = require('../models/loginModel/loginget');

module.exports = {
    getAllLogins(req, res) { // Renombrado para seguir la convención camelCase
        loginGet.getAll((err, logins) => { // Cambio de 'login' a 'logins' para mayor claridad
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error al obtener las contraseñas',
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Contraseñas obtenidas correctamente',
                data: logins
            });
        });
    }
};

