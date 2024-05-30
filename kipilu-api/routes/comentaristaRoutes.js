const comentaristaController = require('../controllers/comentaristaController');

module.exports = (app) => {
  
  // Ruta para obtener todos los comentarios
  app.get('/api/comentaristas', comentaristaController.getAllComments);

  // Ruta para obtener crear un comentario
  app.post('/api/comentaristas/create', comentaristaController.createComment);

  // Ruta para desactivar un comentario por su ID
  app.delete('/api/comentaristas/eliminar/:id', comentaristaController.deactivateComentarista);

};

