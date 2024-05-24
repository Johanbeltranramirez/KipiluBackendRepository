const comentaristaDel = require("../models/comentaristaModel/comentaristadelete");
const comentaristaGet = require("../models/comentaristaModel/comentaristaget");
const comentaristaPost = require("../models/comentaristaModel/comentaristacreate");

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
  },

  // Método para crear un comentario 
  createComment(req, res) {
    const comentarista = req.body; // Datos del comentarista
    comentaristaPost.create(comentarista, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: 'Error al crear el comentario',
          error: err
        });
      }
      return res.status(201).json({
        success: true,
        message: 'Comentario creado correctamente',
        data: data // Id del comentarista creado
      });
    });
  },

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