const Adoptante = require('../models/user'); // Importa el modelo de adoptante
const userget = require('../models/userget');
const userid = require('../models/userid');
const user_update = require('../models/user_update');
const userDelete = require('../models/userdelete');


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
  },

  getAllAdoptantes(req, res) {
    userget.getAll((err, adoptantes) => { 
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al obtener los adoptantes',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Adoptantes obtenidos correctamente',
        data: adoptantes // Datos de todos los adoptantes
      });
    });
  },

  searchAdoptanteById(req, res) {
    const busqueda = req.params.busqueda; // Obtener el término de búsqueda desde los parámetros de la ruta
    userid.searchById(busqueda, (err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al buscar adoptantes por ID',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Adoptantes encontrados',
        data: data
      });
    });
  },

  // Método para actualizar un adoptante por su ID
  updateUser(req, res) {
    const adoptanteId = req.params.id; // Obtén el ID del adoptante de los parámetros de la solicitud
    const adoptanteData = req.body; // Nuevos datos del adoptante

    user_update.update(adoptanteId, adoptanteData, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al actualizar el adoptante',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: result.message // Mensaje de éxito
      });
    });
  },

  deactivateAdoptante(req, res) {
    const adoptanteId = req.params.id; // Obtén el ID del adoptante de los parámetros de la solicitud
  
    userDelete.delete(adoptanteId, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al desactivar el adoptante',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: result.message // Mensaje de éxito
      });
    });
  },
};
