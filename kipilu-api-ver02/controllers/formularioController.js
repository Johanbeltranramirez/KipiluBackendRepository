const formularioget = require('../models/formularioget'); // Renombramos el segundo módulo como Formulario_Get
const formulariodelete = require('../models/formulariodelete'); // Importamos el modelo formulario_delete
const formularioupdate = require('../models/formularioupdate'); // Importamos el modelo formulario_update
const formulariocreate = require('../models/formulariocreate');

module.exports = {

  createformulario(req, res) {
    const formularios = req.body; // Datos del formularios
    formulariocreate.create(formularios, (err, data) => {
      if (err) {
        return res.status(501).json({ // Cambiado de 501 a 500
          success: false,
          message: 'Error al crear el formularios',
          error: err
        });
      }
      return res.status(201).json({
        success: true,
        message: 'Formularios creado correctamente',
        data: data // Id del formularios creado
      });
    });
  },
  

  getAllForms(req, res) {
   formularioget.getAll((err, forms) => { 
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al obtener los formularios',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Formularios obtenidos correctamente',
        data: forms // Datos de todos los formularios
      });
    });
  },

  // Método para eliminar o desactivar un formularios por su ID
  deactivateFormulario(req, res) {
    const IdForm = req.params.id; // Obtén el ID de los parámetros de la solicitud
    formulariodelete.delete(IdForm, (err, result) => { // Desactiva el formularios utilizando el módulo formulario_delete
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al eliminar el formularios',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: result.message // Mensaje de éxito
      });
    });
  },

  // Método para actualizar un formularios por su ID
  updateFormulario(req, res) {
    const IdForm = req.params.id; // Obtén el ID  de los parámetros de la solicitud
    const newData = req.body; // Nuevos datos del formularios
    formularioupdate.update(IdForm, newData, (err, result) => { // Actualiza el formularios utilizando el módulo formulario_update
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al actualizar el formularios',
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
