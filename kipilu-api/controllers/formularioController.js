const formularioget = require('../models/formularioModel/formularioget');
const formulariodelete = require('../models/formularioModel/formulariodelete');
const formularioupdate = require('../models/formularioModel/formularioupdate');
const formulariocreate = require('../models/formularioModel/formulariocreate');
const formularioIdModel = require('../models/formularioModel/formularioid');

module.exports = {
  createFormulario(req, res) {
    const formularioData = req.body;
    formulariocreate.create(formularioData, (err, data) => {
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
        data: data
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
        data: forms
      });
    });
  },

  deactivateFormulario(req, res) {
    const formId = req.params.id;
    formulariodelete.delete(formId, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al eliminar el formulario',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: result.message
      });
    });
  },

  updateFormulario(req, res) {
    const formId = req.params.id;
    const newData = req.body;
    formularioupdate.update(formId, newData, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al actualizar el formulario',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: result.message
      });
    });
  },

  getFormularioById(req, res) {
    const formId = req.params.id;
    formularioIdModel.getById(formId, (err, formulario) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al obtener el formulario por su ID',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Formulario obtenido correctamente',
        data: formulario
      });
    });
  }
};
