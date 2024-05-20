const animalController = require('../controllers/animalController');

module.exports = (app) => {
  // Ruta para crear un animal
  app.post('/api/animales/create', animalController.createAnimal);
  
  // Ruta para obtener todos los animales
  app.get('/api/animales', animalController.getAllAnimals);

  // Ruta para obtener animales por especie
  app.get('/api/animales/especie/:especieId', animalController.getAllAnimalsBySpecies);

  // Ruta para desactivar un animal por su ID
  app.delete('/api/animales/eliminar/:id', animalController.deactivateAnimal); // Corrección: Se añade /:id al final de la ruta

  // Ruta para actualizar un animal por su ID
  app.put('/api/animales/actualizar/:id', animalController.updateAnimal); // Se añade la ruta para actualizar un animal
};
