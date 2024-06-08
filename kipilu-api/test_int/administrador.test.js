const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const loginController = require('../controllers/loginadminController');
const formularioController = require('../controllers/formularioController');

app.use(bodyParser.json());

// Endpoint para login
app.post('/api/login', loginController.login);

// Endpoint para desactivar un formulario
app.delete('/api/formulario/:id', formularioController.deactivateFormulario);

jest.mock('../models/loginModel/loginadminget', () => ({
    verifyCredentials: jest.fn(),
}));

jest.mock('../models/formularioModel/formulariodelete', () => ({
  delete: jest.fn(),
}));

describe('Prueba de Integración: Login y Desactivación de Formulario', () => {
    it('debería loguear al administrador y luego desactivar el formulario', async () => {
        // Mock para la verificación de credenciales
        const loginget = require('../models/loginModel/loginadminget');
        loginget.verifyCredentials.mockImplementation((ID_Administrador, Contrasena, callback) => {
            callback(null, { id: 1, name: 'Admin1', ID_Administrador, Contrasena });
        });

        // Mock para la desactivación de formulario
        const formulariodelete = require('../models/formularioModel/formulariodelete');
        formulariodelete.delete.mockImplementation((id, callback) => callback(null, { message: 'Formulario desactivado' }));

        // Realizar el login
        const loginRes = await request(app)
            .post('/api/login')
            .send({ ID_Administrador: 'admin1', Contrasena: 'password1' });

        // Verificar la respuesta del login
        expect(loginRes.statusCode).toEqual(200);
        expect(loginRes.body.success).toBe(true);
        expect(loginRes.body.data.name).toBe('Admin1');

        // Realizar la desactivación del formulario usando el token de autenticación
        const formDesactivationRes = await request(app)
            .delete('/api/formulario/1')
            .set('Authorization', `Bearer ${loginRes.body.token}`);

        // Verificar la respuesta de la desactivación del formulario
        expect(formDesactivationRes.statusCode).toEqual(200);
        expect(formDesactivationRes.body.success).toBe(true);
        expect(formDesactivationRes.body.message).toBe('Formulario desactivado');
    });
});
