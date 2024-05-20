const usersController = require('../controllers/usersController'); // Importa el controlador de usuarios

module.exports = (app) => {
    // Ruta para registrar un nuevo usuario
    app.post('/api/users/adoptantes', usersController.createAdoptante);
};
