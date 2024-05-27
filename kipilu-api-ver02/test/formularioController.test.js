const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const formularioController = require('../controllers/formularioController');

app.use(bodyParser.json());
app.post('/api/formulario', formularioController.createFormulario);
app.get('/api/formularios', formularioController.getAllForms);
app.delete('/api/formulario/:id', formularioController.deactivateFormulario);
app.put('/api/formulario/:id', formularioController.updateFormulario);
app.get('/api/formulario/:id', formularioController.getFormularioById);

jest.mock('../models/formularioModel/formulariodelete', () => ({
  delete: jest.fn(),
}));
jest.mock('../models/formularioModel/formularioget', () => ({
  getAll: jest.fn(),
}));
jest.mock('../models/formularioModel/formularioupdate', () => ({
  update: jest.fn(),
}));
jest.mock('../models/formularioModel/formulariocreate', () => ({
  create: jest.fn(),
}));
jest.mock('../models/formularioModel/formularioid', () => ({
  getById: jest.fn(),
}));

describe('Formulario Controller', () => {
  it('should create a new form', async () => {
    const formulariocreate = require('../models/formularioModel/formulariocreate');
    formulariocreate.create.mockImplementation((data, callback) => callback(null, data));

    const res = await request(app)
      .post('/api/formulario')
      .send({ formData: 'Form data' });

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Formulario creado correctamente');
    expect(res.body.data.formData).toBe('Form data');
  });

  it('should return 500 if there is an error creating a form', async () => {
    const formulariocreate = require('../models/formularioModel/formulariocreate');
    formulariocreate.create.mockImplementation((data, callback) => callback(new Error('Database error')));

    const res = await request(app)
      .post('/api/formulario')
      .send({ formData: 'Form data' });

    expect(res.statusCode).toEqual(500);
    expect(res.body.success).toBe(false);
  });

  it('should get all forms', async () => {
    const formularioget = require('../models/formularioModel/formularioget');
    formularioget.getAll.mockImplementation(callback => callback(null, [{ id: 1, formData: 'Form data' }]));

    const res = await request(app).get('/api/formularios');

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].formData).toBe('Form data');
  });

  it('should return 500 if there is an error getting all forms', async () => {
    const formularioget = require('../models/formularioModel/formularioget');
    formularioget.getAll.mockImplementation(callback => callback(new Error('Database error')));

    const res = await request(app).get('/api/formularios');

    expect(res.statusCode).toEqual(500);
    expect(res.body.success).toBe(false);
  });

  it('should deactivate a form by id', async () => {
    const formulariodelete = require('../models/formularioModel/formulariodelete');
    formulariodelete.delete.mockImplementation((id, callback) => callback(null, { message: 'Formulario desactivado' }));

    const res = await request(app).delete('/api/formulario/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Formulario desactivado');
  });

  it('should return 500 if there is an error deactivating a form', async () => {
    const formulariodelete = require('../models/formularioModel/formulariodelete');
    formulariodelete.delete.mockImplementation((id, callback) => callback(new Error('Database error')));

    const res = await request(app).delete('/api/formulario/1');

    expect(res.statusCode).toEqual(500);
    expect(res.body.success).toBe(false);
  });

  it('should update a form by id', async () => {
    const formularioupdate = require('../models/formularioModel/formularioupdate');
    formularioupdate.update.mockImplementation((id, data, callback) => callback(null, { message: 'Formulario actualizado' }));

    const res = await request(app)
      .put('/api/formulario/1')
      .send({ formData: 'Updated form data' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Formulario actualizado');
  });

  it('should return 500 if there is an error updating a form', async () => {
    const formularioupdate = require('../models/formularioModel/formularioupdate');
    formularioupdate.update.mockImplementation((id, data, callback) => callback(new Error('Database error')));

    const res = await request(app)
      .put('/api/formulario/1')
      .send({ formData: 'Updated form data' });

    expect(res.statusCode).toEqual(500);
    expect(res.body.success).toBe(false);
  });

  it('should get a form by id', async () => {
    const formularioIdModel = require('../models/formularioModel/formularioid');
    formularioIdModel.getById.mockImplementation((id, callback) => callback(null, { id: 1, formData: 'Form data' }));

    const res = await request(app).get('/api/formulario/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.formData).toBe('Form data');
  });

  it('should return 500 if there is an error getting a form by id', async () => {
    const formularioIdModel = require('../models/formularioModel/formularioid');
    formularioIdModel.getById.mockImplementation((id, callback) => callback(new Error('Database error')));

    const res = await request(app).get('/api/formulario/1');

    expect(res.statusCode).toEqual(500);
    expect(res.body.success).toBe(false);
  });
});

