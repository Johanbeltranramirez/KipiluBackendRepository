const administradorcreate = require('../models/administradorcreate');
const AdministradorDel = require('../models/administradordelete');
const administradorget = require('../models/administradorget');
const AdministradorGet = require('../models/administradorget');
const Administrador_update = require('../models/administradorupdate');

module.exports = {
    createAdministrador(req, res){
        const administrador = req.body; //Datos del administrador
        administradorcreate.create(administrador, (err, date) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al crear el administrador',
                    rror: err
               });
            }
            return res.status(201).json({
              success: true,
              message: 'Administrador creado correctamente',
              data: administrador // ID del adoptante creado
            });
        });
             
    },

    getAllAdministrador(req, res) {
        administradorget.getAll((err, administradores) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error al obtener a los administradores',
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Administradores obtenidos correctamente',
                data: administradores
            });
        });
    },

    //Metodo para desactivar el administrador por ID 
    desactivateAdministrador(req, res){
      const administradorId = req.params.id;
      AdministradorDel.delete(administradorId, (err, result) =>{
        if(err) {
          return res.status(500).json({
            success: false,
            message: 'Error al desactivar el Administrador',
            error: err
          });
        }
        return res.status(200).json({
          success: true,
          message: result.message
        });
      });
    },

    getAdministradorById(req, res) {
      const administradorId = req.params.id; // Obtén el ID del administrador de los parámetros de la solicitud
      AdministradorGet.getById(administradorId, (err, administrador) => { // Obtén el administrador utilizando el módulo AdmistradorGet
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Error al obtener el administrador por su ID',
            error: err
          });
        }
        return res.status(200).json({
          success: true,
          message: 'Administrador obtenido correctamente',
          data: administrador // Datos del animal encontrado
        });
      });
    },

    updateAdministrador(req, res){
      const administradorId = req.params.id; // Obtén el ID del administrador de los parametros de la solicitud
      const newData = req.body;
      Administrador_update.update(administradorId, newData, (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Error al actualizar el administrador',
            error: err
          });
        }
        return res.status(200).json({
          success: true,
          message: err
        });
      });
    }
}