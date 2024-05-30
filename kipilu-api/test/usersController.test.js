const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adoptanteController = require('../controllers/usersController.js');

app.use(bodyParser.json());
app.post('/api/adoptante', adoptanteController.createAdoptante);
app.get('/api/adoptantes', adoptanteController.getAllAdoptantes);
app.get('/api/adoptantes/:busqueda', adoptanteController.searchAdoptanteById);
app.put('/api/adoptantes/:id', adoptanteController.updateUser);
app.delete('/api/adoptantes/:id', adoptanteController.deactivateAdoptante);

jest.mock('../models/adoptanteModel/user', () => ({
  create: jest.fn(),
}));

jest.mock('../models/adoptanteModel/userget', () => ({
  getAll: jest.fn(),
}));

jest.mock('../models/adoptanteModel/userid', () => ({
  searchById: jest.fn(),
}));

jest.mock('../models/adoptanteModel/user_update', () => ({
  update: jest.fn(),
}));

jest.mock('../models/adoptanteModel/userdelete', () => ({
  delete: jest.fn(),
}));

describe('Adoptante Controller', () => {
  it('should create a new adoptante', async () => {
    const Adoptante = require('../models/adoptanteModel/user');
    Adoptante.create.mockImplementation((data, callback) => callback(null, data));

    const res = await request(app)
      .post('/api/adoptante')
      .send({ nombre: 'Adoptante' });

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Adoptante creado correctamente');
    expect(res.body.data.nombre).toBe('Adoptante');
  });

  it('should return 500 if there is an error creating an adoptante', async () => {
    const Adoptante = require('../models/adoptanteModel/user');
    Adoptante.create.mockImplementation((data, callback) => callback(new Error('Database error')));

    const res = await request(app)
      .post('/api/adoptante')
      .send({ nombre: 'Adoptante' });

    expect(res.statusCode).toEqual(501);
    expect(res.body.success).toBe(false);
  });

  it('should get all adoptantes', async () => {
    const UserGet = require('../models/adoptanteModel/userget');
    UserGet.getAll.mockImplementation(callback => callback(null, [{ id: 1, nombre: 'Adoptante' }]));

    const res = await request(app).get('/api/adoptantes');

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].nombre).toBe('Adoptante');
  });

  it('should return 500 if there is an error getting all adoptantes', async () => {
    const UserGet = require('../models/adoptanteModel/userget');
    UserGet.getAll.mockImplementation(callback => callback(new Error('Database error')));

    const res = await request(app).get('/api/adoptantes');

    expect(res.statusCode).toEqual(500);
    expect(res.body.success).toBe(false);
  });

  it('should search adoptante by ID', async () => {
    const UserId = require('../models/adoptanteModel/userid');
    UserId.searchById.mockImplementation((id, callback) => callback(null, { id: 1, nombre: 'Adoptante' }));

    const res = await request(app).get('/api/adoptantes/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.nombre).toBe('Adoptante');
  });

  it('should return 500 if there is an error searching adoptante by ID', async () => {
    const UserId = require('../models/adoptanteModel/userid');
    UserId.searchById.mockImplementation((id, callback) => callback(new Error('Database error')));

    const res = await request(app).get('/api/adoptantes/1');

    expect(res.statusCode).toEqual(500);
    expect(res.body.success).toBe(false);
  });

  it('should update adoptante by ID', async () => {
    const UserUpdate = require('../models/adoptanteModel/user_update');
    UserUpdate.update.mockImplementation((id, data, callback) => callback(null, { message: 'Adoptante actualizado' }));

    const res = await request(app)
      .put('/api/adoptantes/1')
      .send({ nombre: 'Nuevo Adoptante' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Adoptante actualizado');
  });

  it('should return 500 if there is an error updating adoptante by ID', async () => {
    const UserUpdate = require('../models/adoptanteModel/user_update');
    UserUpdate.update.mockImplementation((id, data, callback) => callback(new Error('Database error')));

    const res = await request(app)
      .put('/api/adoptantes/1')
      .send({ nombre: 'Nuevo Adoptante' });

    expect(res.statusCode).toEqual(500);
    expect(res.body.success).toBe(false);
  });

  it('should deactivate adoptante by ID', async () => {
    const UserDelete = require('../models/adoptanteModel/userdelete');
    UserDelete.delete.mockImplementation((id, callback) => callback(null, { message: 'Adoptante desactivado' }));

    const res = await request(app).delete('/api/adoptantes/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Adoptante desactivado');
  });

  it('should return 500 if there is an error deactivating adoptante by ID', async () => {
    const UserDelete = require('../models/adoptanteModel/userdelete');
    UserDelete.delete.mockImplementation((id, callback) => callback(new Error('Database error')));

    const res = await request(app).delete('/api/adoptantes/1');

    expect(res.statusCode).toEqual(500);
    expect(res.body.success).toBe(false);
  });
});
