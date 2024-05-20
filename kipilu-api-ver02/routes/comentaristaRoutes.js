const comentaristaController = require('../controllers/comentaristaController');

module.exports = (app) => {
  
  // Ruta para obtener todos los comentarios
  app.get('/api/comentaristas', comentaristaController.getAllComments);

  // Ruta para desactivar un comentario por su ID
  app.delete('/api/comentaristas/eliminar/:id', comentaristaController.deactivateComentarista);

};

