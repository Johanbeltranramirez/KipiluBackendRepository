const comentaristaDel = require("../models/comentaristadelete");
const comentaristaGet = require("../models/comentaristaget");

module.exports = {
  getAllComments(req, res) {
    comentaristaGet.getAll((err, comments) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al obtener los comentarios',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Comentarios obtenidos correctamente',
        data: comments
      });
    });
  }
  // Método para desactivar un comentario por su ID
  ,


  // Método para desactivar un comentario por su ID
  deactivateComentarista(req, res) {
    const commentId = req.params.id;
    comentaristaDel.delete(commentId, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al desactivar el comentario',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: result.message // Mensaje de éxito
      });
    });
  }
};