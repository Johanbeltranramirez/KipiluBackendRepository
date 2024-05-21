const razaController = require('../controllers/razaController');

module.exports = (app) => {
  // Ruta para crear una raza
  app.post('/api/razas/create', razaController.createRaza);
};
