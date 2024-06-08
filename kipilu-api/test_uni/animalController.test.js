const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const animalController = require('../controllers/animalController');

app.use(bodyParser.json());
app.post('/api/animal', animalController.createAnimal);
app.get('/api/animals', animalController.getAllAnimals);
app.get('/api/animals/species/:especieId', animalController.getAllAnimalsBySpecies);
app.delete('/api/animal/:id', animalController.deactivateAnimal);
app.put('/api/animal/:id', animalController.updateAnimal);
app.get('/api/animal/:id', animalController.getAnimalById);
app.patch('/api/animal/:id/state', animalController.changeAnimalState);

jest.mock('../models/animalModel/animal', () => ({
    create: jest.fn(),
}));
jest.mock('../models/animalModel/animalget', () => ({
    getById: jest.fn(),
    getAll: jest.fn(),
}));
jest.mock('../models/animalModel/animalid', () => ({
    selectAllBySpecies: jest.fn(),
}));
jest.mock('../models/animalModel/animaldelete', () => ({
    delete: jest.fn(),
}));
jest.mock('../models/animalModel/animalupdate', () => ({
    update: jest.fn(),
}));
jest.mock('../models/animalModel/animalalter', () => ({
    updateStateById: jest.fn(),
}));

describe('Animal Controller', () => {
    it('should create a new animal', async () => {
        const Animal = require('../models/animalModel/animal');
        Animal.create.mockImplementation((data, callback) => callback(null, data));

        const res = await request(app)
            .post('/api/animal')
            .send({ name: 'Lion', species: 'Panthera leo' });

        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.name).toBe('Lion');
    });

    it('should return 501 if there is an error creating animal', async () => {
        const Animal = require('../models/animalModel/animal');
        Animal.create.mockImplementation((data, callback) => callback(new Error('Database error')));

        const res = await request(app)
            .post('/api/animal')
            .send({ name: 'Lion', species: 'Panthera leo' });

        expect(res.statusCode).toEqual(501);
        expect(res.body.success).toBe(false);
    });

    it('should fetch all animals', async () => {
        const AnimalGet = require('../models/animalModel/animalget');
        AnimalGet.getAll.mockImplementation(callback => callback(null, [{ id: 1, name: 'Lion' }]));

        const res = await request(app).get('/api/animals');

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return 500 if there is an error fetching animals', async () => {
        const AnimalGet = require('../models/animalModel/animalget');
        AnimalGet.getAll.mockImplementation(callback => callback(new Error('Database error')));

        const res = await request(app).get('/api/animals');

        expect(res.statusCode).toEqual(500);
        expect(res.body.success).toBe(false);
    });

    it('should fetch all animals by species', async () => {
        const AnimalId = require('../models/animalModel/animalid');
        AnimalId.selectAllBySpecies.mockImplementation((especieId, callback) => callback(null, [{ id: 1, name: 'Lion', species: especieId }]));

        const res = await request(app).get('/api/animals/species/1');

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return 500 if there is an error fetching animals by species', async () => {
        const AnimalId = require('../models/animalModel/animalid');
        AnimalId.selectAllBySpecies.mockImplementation((especieId, callback) => callback(new Error('Database error')));

        const res = await request(app).get('/api/animals/species/1');

        expect(res.statusCode).toEqual(500);
        expect(res.body.success).toBe(false);
    });

    it('should deactivate an animal by id', async () => {
        const AnimalDel = require('../models/animalModel/animaldelete');
        AnimalDel.delete.mockImplementation((id, callback) => callback(null, { message: 'Animal desactivado' }));

        const res = await request(app).delete('/api/animal/1');

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Animal desactivado');
    });

    it('should return 500 if there is an error deactivating an animal', async () => {
        const AnimalDel = require('../models/animalModel/animaldelete');
        AnimalDel.delete.mockImplementation((id, callback) => callback(new Error('Database error')));

        const res = await request(app).delete('/api/animal/1');

        expect(res.statusCode).toEqual(500);
        expect(res.body.success).toBe(false);
    });

    it('should update an animal by id', async () => {
        const AnimalUpdate = require('../models/animalModel/animalupdate');
        AnimalUpdate.update.mockImplementation((id, data, callback) => callback(null, { message: 'Animal actualizado' }));

        const res = await request(app)
            .put('/api/animal/1')
            .send({ name: 'Lion Updated' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Animal actualizado');
    });

    it('should return 500 if there is an error updating an animal', async () => {
        const AnimalUpdate = require('../models/animalModel/animalupdate');
        AnimalUpdate.update.mockImplementation((id, data, callback) => callback(new Error('Database error')));

        const res = await request(app)
            .put('/api/animal/1')
            .send({ name: 'Lion Updated' });

        expect(res.statusCode).toEqual(500);
        expect(res.body.success).toBe(false);
    });

    it('should fetch an animal by id', async () => {
        const AnimalGet = require('../models/animalModel/animalget');
        AnimalGet.getById.mockImplementation((id, callback) => callback(null, { id, name: 'Lion' }));

        const res = await request(app).get('/api/animal/1');

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.name).toBe('Lion');
    });

    it('should return 500 if there is an error fetching an animal by id', async () => {
        const AnimalGet = require('../models/animalModel/animalget');
        AnimalGet.getById.mockImplementation((id, callback) => callback(new Error('Database error')));

        const res = await request(app).get('/api/animal/1');

        expect(res.statusCode).toEqual(500);
        expect(res.body.success).toBe(false);
    });

    it('should change the state of an animal by id', async () => {
        const AnimalAlter = require('../models/animalModel/animalAlter');
        AnimalAlter.updateStateById.mockImplementation((id, callback) => callback(null, { message: 'Estado del animal actualizado' }));

        const res = await request(app).patch('/api/animal/1/state');

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Estado del animal actualizado correctamente');
    });

    it('should return 500 if there is an error changing the state of an animal', async () => {
        const AnimalAlter = require('../models/animalModel/animalAlter');
        AnimalAlter.updateStateById.mockImplementation((id, callback) => callback(new Error('Database error')));

        const res = await request(app).patch('/api/animal/1/state');

        expect(res.statusCode).toEqual(500);
        expect(res.body.success).toBe(false);
    });
});
