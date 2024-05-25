const formularioget = require('../models/formularioModel/formularioget'); // Importamos el modelo formulario_get
const formulariodelete = require('../models/formularioModel/formulariodelete'); // Importamos el modelo formulario_delete
const formularioupdate = require('../models/formularioModel/formularioupdate'); // Importamos el modelo formulario_update
const formulariocreate = require('../models/formularioModel/formulariocreate');
const formularioIdModel = require('../models/formularioModel/formularioid'); // Importamos el modelo para buscar formulario por ID

module.exports = {

  createformulario(req, res) {
    const formularios = req.body; // Datos del formulario
    formulariocreate.create(formularios, (err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al crear el formulario',
          error: err
        });
      }
      return res.status(201).json({
        success: true,
        message: 'Formulario creado correctamente',
        data: data // Id del formulario creado
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


  // Método para eliminar o desactivar un formulario por su ID
  deactivateFormulario(req, res) {
    const IdForm = req.params.id; // Obtén el ID de los parámetros de la solicitud
    formulariodelete.delete(IdForm, (err, result) => { // Desactiva el formulario utilizando el módulo formulario_delete
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al eliminar el formulario',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: result.message // Mensaje de éxito
      });
    });
  },

  // Método para actualizar un formulario por su ID
  updateFormulario(req, res) {
    const IdForm = req.params.id; // Obtén el ID de los parámetros de la solicitud
    const newData = req.body; // Nuevos datos del formulario
    formularioupdate.update(IdForm, newData, (err, result) => { // Actualiza el formulario utilizando el módulo formulario_update
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al actualizar el formulario',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: result.message // Mensaje de éxito
      });
    });
  },

  // Método para obtener un formulario por su ID
  getFormularioById(req, res) {
    const formularioId = req.params.id; // Obtén el ID de los parámetros de la solicitud
    formularioIdModel.getById(formularioId, (err, formulario) => { // Obtiene el formulario utilizando el módulo formularioIdModel
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al obtener el formulario por ID',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Formulario obtenido correctamente',
        data: formulario // Datos del formulario obtenido
      });
    });
  }
};
