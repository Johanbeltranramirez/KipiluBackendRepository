const loginsuperadminController = require('../controllers/loginsuperadminController');

module.exports = (app) => {
    // Ruta para el login del administrador
    app.post('/api/superadmin/login', loginsuperadminController.login);

    // Ruta para actualizar la contraseña de un superadmin
    app.put('/api/superadmin/newpassword', loginsuperadminController.verifyAndUpdatePassword);
};
