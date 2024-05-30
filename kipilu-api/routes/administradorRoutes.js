const administradorController = require('../controllers/administradorController');

module.exports = (app) => {

    //Ruta para registar un nuevo administrador
    app.post('/api/administrador/create', administradorController.createAdministrador);

    //ruta para obtener todos los administradores
    app.get('/api/administradores', administradorController.getAllAdministrador);

    //ruta para buscar por id a los administradores
    app.get('/api/administrador/:id', administradorController.getAdministradorById);

    //ruta para actualizar el administrador por id
    app.put('/api/administrador/:id', administradorController.updateAdministrador);

    //ruta para eliminar el administrador por id
    app.delete('/api/administrador/eliminar/:id', administradorController.desactivateAdministrador);
}