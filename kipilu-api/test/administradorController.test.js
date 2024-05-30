const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const administradorController = require('../controllers/administradorController');

app.use(bodyParser.json());
app.post('/api/administrador', administradorController.createAdministrador);
app.get('/api/administradores', administradorController.getAllAdministrador);
app.delete('/api/administrador/:id', administradorController.desactivateAdministrador);
app.get('/api/administrador/:id', administradorController.getAdministradorById);
app.put('/api/administrador/:id', administradorController.updateAdministrador);

jest.mock('../models/administradorModel/administradorcreate', () => ({
    create: jest.fn(),
}));
jest.mock('../models/administradorModel/administradordelete', () => ({
    delete: jest.fn(),
}));
jest.mock('../models/administradorModel/administradorupdate', () => ({
    update: jest.fn(),
}));
jest.mock('../models/administradorModel/administradorget', () => ({
    getById: jest.fn(),
    getAll: jest.fn(),
}));

describe('Administrador Controller', () => {
    it('should create a new administrador', async () => {
        const administradorcreate = require('../models/administradorModel/administradorcreate');
        administradorcreate.create.mockImplementation((data, callback) => callback(null, data));

        const res = await request(app)
            .post('/api/administrador')
            .send({ name: 'Admin1', email: 'admin1@example.com' });

        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.name).toBe('Admin1');
    });

    it('should return 501 if there is an error creating administrador', async () => {
        const administradorcreate = require('../models/administradorModel/administradorcreate');
        administradorcreate.create.mockImplementation((data, callback) => callback(new Error('Database error')));

        const res = await request(app)
            .post('/api/administrador')
            .send({ name: 'Admin1', email: 'admin1@example.com' });

        expect(res.statusCode).toEqual(501);
        expect(res.body.success).toBe(false);
    });

    it('should fetch all administradores', async () => {
        const administradorget = require('../models/administradorModel/administradorget');
        administradorget.getAll.mockImplementation(callback => callback(null, [{ id: 1, name: 'Admin1' }]));

        const res = await request(app).get('/api/administradores');

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return 500 if there is an error fetching administradores', async () => {
        const administradorget = require('../models/administradorModel/administradorget');
        administradorget.getAll.mockImplementation(callback => callback(new Error('Database error')));

        const res = await request(app).get('/api/administradores');

        expect(res.statusCode).toEqual(500);
        expect(res.body.success).toBe(false);
    });

    it('should deactivate administrador by id', async () => {
        const AdministradorDel = require('../models/administradorModel/administradordelete');
        AdministradorDel.delete.mockImplementation((id, callback) => callback(null, { message: 'Administrador desactivado' }));

        const res = await request(app).delete('/api/administrador/1');

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Administrador desactivado');
    });

    it('should return 500 if there is an error deactivating administrador', async () => {
        const AdministradorDel = require('../models/administradorModel/administradordelete');
        AdministradorDel.delete.mockImplementation((id, callback) => callback(new Error('Database error')));

        const res = await request(app).delete('/api/administrador/1');

        expect(res.statusCode).toEqual(500);
        expect(res.body.success).toBe(false);
    });

    it('should fetch administrador by id', async () => {
        const AdministradorGet = require('../models/administradorModel/administradorget');
        AdministradorGet.getById.mockImplementation((id, callback) => callback(null, { id: 1, name: 'Admin1' }));

        const res = await request(app).get('/api/administrador/1');

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.name).toBe('Admin1');
    });

    it('should return 500 if there is an error fetching administrador by id', async () => {
        const AdministradorGet = require('../models/administradorModel/administradorget');
        AdministradorGet.getById.mockImplementation((id, callback) => callback(new Error('Database error')));

        const res = await request(app).get('/api/administrador/1');

        expect(res.statusCode).toEqual(500);
        expect(res.body.success).toBe(false);
    });

    it('should update administrador by id', async () => {
        const Administrador_update = require('../models/administradorModel/administradorupdate');
        Administrador_update.update.mockImplementation((id, data, callback) => callback(null, data));

        const res = await request(app)
            .put('/api/administrador/1')
            .send({ name: 'Admin1 Updated', email: 'admin1updated@example.com' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });

    it('should return 500 if there is an error updating administrador', async () => {
        const Administrador_update = require('../models/administradorModel/administradorupdate');
        Administrador_update.update.mockImplementation((id, data, callback) => callback(new Error('Database error')));

        const res = await request(app)
            .put('/api/administrador/1')
            .send({ name: 'Admin1 Updated', email: 'admin1updated@example.com' });

        expect(res.statusCode).toEqual(500);
        expect(res.body.success).toBe(false);
    });
});
