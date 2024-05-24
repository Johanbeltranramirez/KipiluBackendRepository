const Raza = require('../models/animalModel/raza');

module.exports = {
  createRaza(req, res) {
    const raza = req.body; // Datos de la raza
    Raza.create(raza, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: 'Error al crear la raza',
          error: err
        });
      }
      return res.status(201).json({
        success: true,
        message: 'Raza creada correctamente',
        data: data // Id de la raza creada
      });
    });
  },

  getAllRazas(req, res) {
    Raza.getAll((err, razas) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al obtener las razas',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Razas obtenidas correctamente',
        data: razas
      });
    });
  }
};
