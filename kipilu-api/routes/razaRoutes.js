const razaController = require('../controllers/razaController');

module.exports = (app) => {
  // Ruta para crear una raza
  app.post('/api/razas/create', razaController.createRaza);

  // Ruta para obtener todas las razas
  app.get('/api/razas', razaController.getAllRazas);
};
