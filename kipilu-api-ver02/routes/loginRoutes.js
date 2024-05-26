const loginController = require('../controllers/loginController');

module.exports = (app) => {
    // Ruta para el login del administrador
    app.post('/api/admin/login', loginController.login);
};
