const Animal = require('../models/animal');
const AnimalGet = require('../models/animalget'); // Renombramos el segundo módulo como AnimalGet
const AnimalId = require('../models/animalid'); // Importamos el modelo animalid
const AnimalDel = require('../models/animaldelete'); // Importamos el modelo animaldelete
const AnimalUpdate = require('../models/animalupdate'); // Importamos el modelo animalupdate

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
    AnimalGet.getAll((err, animals) => { // Utilizamos AnimalGet en lugar de Animal
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
        data: animals // Datos de todos los animales
      });
    });
  },

  getAllAnimalsBySpecies(req, res) {
    const especieId = req.params.especieId; // Obtén el ID de la especie de los parámetros de la solicitud
    AnimalId.selectAllBySpecies(especieId, (err, animals) => { // Utilizamos AnimalId para obtener los animales por especie
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
        data: animals // Datos de todos los animales que cumplen con la especie especificada
      });
    });
  },

  // Método para desactivar un animal por su ID
  deactivateAnimal(req, res) {
    const animalId = req.params.id; // Obtén el ID del animal de los parámetros de la solicitud
    AnimalDel.delete(animalId, (err, result) => { // Desactiva el animal utilizando el módulo AnimalDel
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al desactivar el animal',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: result.message // Mensaje de éxito
      });
    });
  },

  // Método para actualizar un animal por su ID
  updateAnimal(req, res) {
    const animalId = req.params.id; // Obtén el ID del animal de los parámetros de la solicitud
    const newData = req.body; // Nuevos datos del animal
    AnimalUpdate.update(animalId, newData, (err, result) => { // Actualiza el animal utilizando el módulo AnimalUpdate
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al actualizar el animal',
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
