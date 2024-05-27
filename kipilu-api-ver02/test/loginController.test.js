const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const loginController = require('../controllers/loginController');

app.use(bodyParser.json());
app.get('/api/logins', loginController.getAllLogins);

jest.mock('../models/loginModel/loginget', () => ({
    getAll: jest.fn(),
}));

describe('Login Controller', () => {
    it('should get all logins', async () => {
        const loginGet = require('../models/loginModel/loginget');
        loginGet.getAll.mockImplementation(callback => callback(null, [{ id: 1, username: 'user1' }]));

        const res = await request(app).get('/api/logins');

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.length).toBe(1);
        expect(res.body.data[0].username).toBe('user1');
    });

    it('should return 500 if there is an error getting all logins', async () => {
        const loginGet = require('../models/loginModel/loginget');
        loginGet.getAll.mockImplementation(callback => callback(new Error('Database error')));

        const res = await request(app).get('/api/logins');

        expect(res.statusCode).toEqual(500);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Error al obtener las contraseñas');
    });
});
