const usersController = require('../controllers/usersController'); // Importa el controlador de usuarios

module.exports = (app) => {
    // Ruta para registrar un nuevo adoptante
    app.post('/api/users/adoptantes/create', usersController.createAdoptante);
    
    // Ruta para obtener todos los adoptantes
    app.get('/api/users/adoptantes', usersController.getAllAdoptantes);
    
    // Ruta para buscar adoptantes por ID
    app.get('/api/users/adoptantes/search/:busqueda', usersController.searchAdoptanteById);
};
