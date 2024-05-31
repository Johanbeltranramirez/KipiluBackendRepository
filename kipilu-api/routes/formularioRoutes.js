const formularioController = require('../controllers/formularioController');

module.exports = (app) => {
  
  // Ruta para obtener todos los formularios
  app.get('/api/formularios', formularioController.getAllForms);

  // Ruta para crear el formulario
  app.post('/api/formularios/create', formularioController.createFormulario); 

  // Ruta para desactivar o eliminar un formulario por su ID
  app.delete('/api/formularios/eliminar/:id', formularioController.deactivateFormulario); // Recordar: Se añade /:id al final de la ruta

  // Ruta para actualizar un formulario por su ID
  app.put('/api/formularios/actualizar/:id', formularioController.updateFormulario); // Se añade la ruta para actualizar un formulario

  // Ruta para obtener un formulario por su ID
  app.get('/api/formularios/:id', formularioController.getFormularioById); // Ruta para obtener un formulario por su ID
};
