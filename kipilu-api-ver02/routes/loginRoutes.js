const loginController = require('../controllers/loginController');

module.exports = (app) => {
    // Ruta para buscar todas las contraseñas
    app.get('/api/logins', loginController.getAllLogins); // Cambio a 'administradores' y corrección de la barra inicial
};
    