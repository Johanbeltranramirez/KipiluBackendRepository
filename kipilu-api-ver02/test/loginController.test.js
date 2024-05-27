// test/loginController.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const loginController = require('../controllers/loginController');

app.use(bodyParser.json());
app.post('/api/login', loginController.login);

jest.mock('../models/loginModel/loginget', () => ({
    verifyCredentials: jest.fn(),
}));

describe('Login Controller', () => {
    it('should authenticate a valid administrador', async () => {
        const loginget = require('../models/loginModel/loginget');
        loginget.verifyCredentials.mockImplementation((ID_Administrador, Contrasena, callback) => {
            callback(null, { id: 1, name: 'Admin1', ID_Administrador, Contrasena });
        });

        const res = await request(app)
            .post('/api/login')
            .send({ ID_Administrador: 'admin1', Contrasena: 'password1' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.name).toBe('Admin1');
    });

    it('should return 400 if ID_Administrador or Contrasena is missing', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ ID_Administrador: 'admin1' });

        expect(res.statusCode).toEqual(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('ID_Administrador y Contrasena son requeridos');
    });

    it('should return 401 if credentials are incorrect', async () => {
        const loginget = require('../models/loginModel/loginget');
        loginget.verifyCredentials.mockImplementation((ID_Administrador, Contrasena, callback) => {
            callback(null, null);
        });

        const res = await request(app)
            .post('/api/login')
            .send({ ID_Administrador: 'admin1', Contrasena: 'wrongpassword' });

        expect(res.statusCode).toEqual(401);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('ID_Administrador o Contrasena incorrectos');
    });

    it('should return 500 if there is an error verifying credentials', async () => {
        const loginget = require('../models/loginModel/loginget');
        loginget.verifyCredentials.mockImplementation((ID_Administrador, Contrasena, callback) => {
            callback(new Error('Database error'), null);
        });

        const res = await request(app)
            .post('/api/login')
            .send({ ID_Administrador: 'admin1', Contrasena: 'password1' });

        expect(res.statusCode).toEqual(500);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Error al verificar las credenciales del administrador');
    });
});
