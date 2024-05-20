const formularioController = require('../controllers/formularioController');

module.exports = (app) => {
  
  // Ruta para obtener todos los formularios
  app.get('/api/formularios', formularioController.getAllForms);

   // Ruta para crear el formularios
   app.post('/api/formularios/create', formularioController.createformulario); 

  // Ruta para desactivar o eliminar un formularios por su ID
  app.delete('/api/formularios/eliminar/:id', formularioController.deactivateFormulario); // Recordar: Se añade /:id al final de la ruta

  // Ruta para actualizar un formularios por su ID
  app.put('/api/formularios/actualizar/:id', formularioController.updateFormulario); // Se añade la ruta para actualizar un formularios
};
