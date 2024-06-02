const loginadminController = require('../controllers/loginadminController');

module.exports = (app) => {
    // Ruta para el login del administrador
    app.post('/api/admin/login', loginadminController.login);
};
