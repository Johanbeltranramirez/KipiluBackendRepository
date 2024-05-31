const usersController = require('../controllers/usersController'); // Importa el controlador de usuarios

module.exports = (app) => {
    // Ruta para registrar un nuevo adoptante
    app.post('/api/users/adoptantes/create', usersController.createAdoptante);
    
    // Ruta para obtener todos los adoptantes
    app.get('/api/users/adoptantes', usersController.getAllAdoptantes);
    
    // Ruta para buscar adoptantes por ID
    app.get('/api/users/adoptantes/search/:busqueda', usersController.searchAdoptanteById);

    // Ruta para actualizar adoptantes por su ID
    app.put('/api/users/adoptantes/:id', usersController.updateUser);

    // Ruta para desactivar adoptantes por su ID
    app.delete('/api/users/adoptantes/:id', usersController.deactivateAdoptante);
};
