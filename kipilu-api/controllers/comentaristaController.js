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

  createComment(req, res) {
    const comentarista = req.body;
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
        data: data
      });
    });
  },

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
        message: result.message
      });
    });
  }
};
