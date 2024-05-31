const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const razaController = require('../controllers/razaController');

app.use(bodyParser.json());
app.post('/api/raza', razaController.createRaza);
app.get('/api/razas', razaController.getAllRazas);

jest.mock('../models/animalModel/raza', () => ({
  create: jest.fn(),
  getAll: jest.fn(),
}));

describe('Raza Controller', () => {
  it('should create a new raza', async () => {
    const Raza = require('../models/animalModel/raza');
    Raza.create.mockImplementation((data, callback) => callback(null, data));

    const res = await request(app)
      .post('/api/raza')
      .send({ nombre: 'Raza' });

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Raza creada correctamente');
    expect(res.body.data.nombre).toBe('Raza');
  });

  it('should return 500 if there is an error creating a raza', async () => {
    const Raza = require('../models/animalModel/raza');
    Raza.create.mockImplementation((data, callback) => callback(new Error('Database error')));

    const res = await request(app)
      .post('/api/raza')
      .send({ nombre: 'Raza' });

    expect(res.statusCode).toEqual(501);
    expect(res.body.success).toBe(false);
  });

  it('should get all razas', async () => {
    const Raza = require('../models/animalModel/raza');
    Raza.getAll.mockImplementation(callback => callback(null, [{ id: 1, nombre: 'Raza' }]));

    const res = await request(app).get('/api/razas');

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].nombre).toBe('Raza');
  });

  it('should return 500 if there is an error getting all razas', async () => {
    const Raza = require('../models/animalModel/raza');
    Raza.getAll.mockImplementation(callback => callback(new Error('Database error')));

    const res = await request(app).get('/api/razas');

    expect(res.statusCode).toEqual(500);
    expect(res.body.success).toBe(false);
  });
});
