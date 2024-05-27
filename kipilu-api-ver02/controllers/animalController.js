const Animal = require('../models/animalModel/animal');
const AnimalGet = require('../models/animalModel/animalget');
const AnimalId = require('../models/animalModel/animalid');
const AnimalDel = require('../models/animalModel/animaldelete');
const AnimalUpdate = require('../models/animalModel/animalupdate');
const AnimalAlter = require('../models/animalModel/animalalter');

module.exports = {
  createAnimal(req, res) {
    const animal = req.body; // Datos del animal
    Animal.create(animal, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: 'Error al crear el animal',
          error: err
        });
      }
      return res.status(201).json({
        success: true,
        message: 'Animal creado correctamente',
        data: data // Id del animal creado
      });
    });
  },

  getAllAnimals(req, res) {
    AnimalGet.getAll((err, animals) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al obtener los animales',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Animales obtenidos correctamente',
        data: animals
      });
    });
  },

  getAllAnimalsBySpecies(req, res) {
    const especieId = req.params.especieId;
    AnimalId.selectAllBySpecies(especieId, (err, animals) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al obtener los animales por especie',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Animales obtenidos por especie correctamente',
        data: animals
      });
    });
  },

  deactivateAnimal(req, res) {
    const animalId = req.params.id;
    AnimalDel.delete(animalId, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al desactivar el animal',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: result.message
      });
    });
  },

  updateAnimal(req, res) {
    const animalId = req.params.id;
    const newData = req.body;
    AnimalUpdate.update(animalId, newData, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al actualizar el animal',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: result.message
      });
    });
  },
  
  getAnimalById(req, res) {
    const animalId = req.params.id;
    AnimalGet.getById(animalId, (err, animal) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al obtener el animal por su ID',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Animal obtenido correctamente',
        data: animal
      });
    });
  },

  changeAnimalState(req, res) {
    const animalId = req.params.id;
    AnimalAlter.updateStateById(animalId, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al cambiar el estado del animal',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Estado del animal actualizado correctamente'
      });
    });
  }
};
