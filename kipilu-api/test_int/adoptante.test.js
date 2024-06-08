const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const animalController = require('../controllers/animalController');
const usersController = require('../controllers/usersController');

// Mockeo de los módulos del modelo para evitar llamadas reales a la base de datos durante las pruebas
jest.mock('../config/db/db', () => ({})); // Mockear el módulo de la base de datos
jest.mock('../models/animalModel/animal', () => ({
    create: jest.fn(),
}));
jest.mock('../models/adoptanteModel/user', () => ({
    create: jest.fn(),
}));

app.use(bodyParser.json());
app.post('/api/animal', animalController.createAnimal);
app.post('/api/users/adoptantes/create', usersController.createAdoptante);

describe('Suite de Pruebas para Adoptantes', () => {
    afterAll(() => {
        jest.resetAllMocks(); // Restablecer todos los mocks después de todas las pruebas
    });

    it('debería crear un animal y luego crear un adoptante para ese animal', async () => {
        // Mock para la creación del animal
        const Animal = require('../models/animalModel/animal');
        const mockAnimalId = 1;
        Animal.create.mockImplementation((data, callback) => callback(null, { id: mockAnimalId }));

        // Mock para la creación del adoptante
        const Adoptante = require('../models/adoptanteModel/user');
        Adoptante.create.mockImplementation((data, callback) => callback(null, { ...data, ID_Adoptante: 1 }));

        // Llamada para crear un animal
        const animalRes = await request(app)
            .post('/api/animal')
            .send({ nombre: 'León', especie: 'Panthera leo' });

        expect(animalRes.statusCode).toEqual(201);
        expect(animalRes.body.success).toBe(true);
        expect(animalRes.body.data.id).toBe(mockAnimalId);

        // Llamada para crear un adoptante asociado al animal creado anteriormente
        const res = await request(app)
            .post('/api/users/adoptantes/create')
            .send({
                ID_Adoptante: 1,
                P_Nombre: 'Juan',
                S_Nombre: 'Doe',
                P_Apellido: 'Smith',
                S_Apellido: 'Johnson',
                Correo: 'juan@example.com',
                Direccion: '123 Calle Principal',
                Telefono: '555-5555',
                ID_Animal: mockAnimalId
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.ID_Adoptante).toBe(1);
        expect(res.body.data.ID_Animal).toBe(mockAnimalId);
    });

    // Limpiar mocks después de cada prueba
    afterEach(() => {
        jest.clearAllMocks();
    });
});
