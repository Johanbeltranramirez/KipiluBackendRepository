// Importamos las dependencias necesarias
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const usersController = require('../controllers/usersController');

// Configuramos el middleware para analizar las solicitudes JSON
app.use(bodyParser.json());

// Definimos las rutas de la API y las asociamos con sus controladores correspondientes
app.post('/api/users/adoptantes/create', usersController.createAdoptante);
app.get('/api/users/adoptantes', usersController.getAllAdoptantes);
app.get('/api/users/adoptantes/search/:busqueda', usersController.searchAdoptanteById);
app.put('/api/users/adoptantes/:id', usersController.updateUser);
app.delete('/api/users/adoptantes/:id', usersController.deactivateAdoptante);

// Mockeamos los módulos del modelo para evitar llamadas reales a la base de datos durante las pruebas
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

// Descripción de la suite de pruebas para el controlador de Usuarios
describe('Users Controller', () => {

  // Prueba para la creación de un nuevo adoptante
  it('should create a new adoptante', async () => {
    const Adoptante = require('../models/adoptanteModel/user');
    Adoptante.create.mockImplementation((data, callback) => callback(null, data));

    const res = await request(app)
      .post('/api/users/adoptantes/create')
      .send({ 
        ID_Adoptante: 1,
        P_Nombre: 'John', 
        S_Nombre: 'Doe', 
        P_Apellido: 'Smith', 
        S_Apellido: 'Johnson', 
        Correo: 'john@example.com', 
        Direccion: '123 Main St', 
        Telefono: '555-5555',
        ID_Animal: 1 
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Adoptante creado correctamente');
    expect(res.body.data.ID_Adoptante).toBe(1);
  });

  // Prueba para la creación de un adoptante con error
  it('should return 500 if there is an error creating an adoptante', async () => {
    const Adoptante = require('../models/adoptanteModel/user');
    Adoptante.create.mockImplementation((data, callback) => callback(new Error('Database error')));

    const res = await request(app)
      .post('/api/users/adoptantes/create')
      .send({ 
        ID_Adoptante: 1,
        P_Nombre: 'John', 
        S_Nombre: 'Doe', 
        P_Apellido: 'Smith', 
        S_Apellido: 'Johnson', 
        Correo: 'john@example.com', 
        Direccion: '123 Main St', 
        Telefono: '555-5555',
        ID_Animal: 1 
      });

    expect(res.statusCode).toEqual(501);
    expect(res.body.success).toBe(false);
  });

  // Prueba para obtener todos los adoptantes
  it('should get all adoptantes', async () => {
    const userget = require('../models/adoptanteModel/userget');
    userget.getAll.mockImplementation(callback => callback(null, [{ 
      ID_Adoptante: 1,
      P_Nombre: 'John', 
      S_Nombre: 'Doe', 
      P_Apellido: 'Smith', 
      S_Apellido: 'Johnson', 
      Correo: 'john@example.com', 
      Direccion: '123 Main St', 
      Telefono: '555-5555',
      ID_Animal: 1 
    }]));

    const res = await request(app).get('/api/users/adoptantes');

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].P_Nombre).toBe('John');
  });

  // Prueba para obtener todos los adoptantes con error
  it('should return 500 if there is an error getting all adoptantes', async () => {
    const userget = require('../models/adoptanteModel/userget');
    userget.getAll.mockImplementation(callback => callback(new Error('Database error')));

    const res = await request(app).get('/api/users/adoptantes');

    expect(res.statusCode).toEqual(500);
    expect(res.body.success).toBe(false);
  });

  // Prueba para buscar un adoptante por ID
  it('should search adoptante by ID', async () => {
    const userid = require('../models/adoptanteModel/userid');
    userid.searchById.mockImplementation((id, callback) => callback(null, [{ 
      ID_Adoptante: 1,
      P_Nombre: 'John', 
      S_Nombre: 'Doe', 
      P_Apellido: 'Smith', 
      S_Apellido: 'Johnson', 
      Correo: 'john@example.com', 
      Direccion: '123 Main St', 
      Telefono: '555-5555',
      ID_Animal: 1 
    }]));

    const res = await request(app).get('/api/users/adoptantes/search/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].P_Nombre).toBe('John');
  });

  // Prueba para buscar un adoptante por ID con error
  it('should return 500 if there is an error searching adoptante by ID', async () => {
    const userid = require('../models/adoptanteModel/userid');
    userid.searchById.mockImplementation((id, callback) => callback(new Error('Database error')));

    const res = await request(app).get('/api/users/adoptantes/search/1');

    expect(res.statusCode).toEqual(500);
    expect(res.body.success).toBe(false);
  });

  // Prueba para actualizar un adoptante por ID
  it('should update an adoptante by id', async () => {
    const user_update = require('../models/adoptanteModel/user_update');
    user_update.update.mockImplementation((id, data, callback) => callback(null, { message: 'Adoptante actualizado correctamente' }));

    const res = await request(app)
      .put('/api/users/adoptantes/1')
      .send({ 
        P_Nombre: 'Jane', 
        S_Nombre: 'Doe', 
        P_Apellido: 'Smith', 
        S_Apellido: 'Johnson', 
        Correo: 'jane@example.com', 
        Direccion: '456 Main St', 
        Telefono: '555-1234',
        ID_Animal: 1 
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Adoptante actualizado correctamente');
  });

  // Prueba para actualizar un adoptante con error
  it('should return 500 if there is an error updating an adoptante', async () => {
    const user_update = require('../models/adoptanteModel/user_update');
    user_update.update.mockImplementation((id, data, callback) => callback(new Error('Database error')));

    const res = await request(app)
      .put('/api/users/adoptantes/1')
      .send({ 
        P_Nombre: 'Jane', 
        S_Nombre: 'Doe', 
        P_Apellido: 'Smith', 
        S_Apellido: 'Johnson', 
        Correo: 'jane@example.com', 
        Direccion: '456 Main St', 
        Telefono: '555-1234',
        ID_Animal: 1 
      });

    expect(res.statusCode).toEqual(500);
    expect(res.body.success).toBe(false);
  });

  // Prueba para desactivar un adoptante por ID
  it('should deactivate an adoptante by id', async () => {
    const userdelete = require('../models/adoptanteModel/userdelete');
    userdelete.delete.mockImplementation((id, callback) => callback(null, { message: 'Adoptante eliminado correctamente' }));

    const res = await request(app).delete('/api/users/adoptantes/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Adoptante eliminado correctamente');
  });

   // Prueba para desactivar un adoptante con error
   it('should return 500 if there is an error deactivating an adoptante', async () => {
    const userdelete = require('../models/adoptanteModel/userdelete');
    userdelete.delete.mockImplementation((id, callback) => callback(new Error('Database error')));

    const res = await request(app).delete('/api/users/adoptantes/1');

    expect(res.statusCode).toEqual(500);
    expect(res.body.success).toBe(false);
  });
});
