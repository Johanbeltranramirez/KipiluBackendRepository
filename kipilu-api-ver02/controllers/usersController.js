const Adoptante = require('../models/user'); // Importa el modelo de adoptante

module.exports = {
  createAdoptante(req, res) {
    const adoptante = req.body; // Datos del adoptante
    Adoptante.create(adoptante, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: 'Error al crear el adoptante',
          error: err
        });
      }
      return res.status(201).json({
        success: true,
        message: 'Adoptante creado correctamente',
        data: data // ID del adoptante creado
      });
    });
  }
};
