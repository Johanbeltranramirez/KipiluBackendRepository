const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const comentariosController = require('../controllers/comentaristaController.js');

app.use(bodyParser.json());
app.get('/api/comments', comentariosController.getAllComments);
app.post('/api/comments', comentariosController.createComment);
app.delete('/api/comments/:id', comentariosController.deactivateComentarista);

jest.mock('../models/comentaristaModel/comentaristadelete', () => ({
  delete: jest.fn(),
}));
jest.mock('../models/comentaristaModel/comentaristaget', () => ({
  getAll: jest.fn(),
}));
jest.mock('../models/comentaristaModel/comentaristacreate', () => ({
  create: jest.fn(),
}));

describe('Comentarios Controller', () => {
  it('should fetch all comments', async () => {
    const comentaristaGet = require('../models/comentaristaModel/comentaristaget');
    comentaristaGet.getAll.mockImplementation(callback => callback(null, [{ id: 1, comment: 'Great!' }]));

    const res = await request(app).get('/api/comments');

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('should return 500 if there is an error fetching comments', async () => {
    const comentaristaGet = require('../models/comentaristaModel/comentaristaget');
    comentaristaGet.getAll.mockImplementation(callback => callback(new Error('Database error')));

    const res = await request(app).get('/api/comments');

    expect(res.statusCode).toEqual(500);
    expect(res.body.success).toBe(false);
  });

  it('should create a new comment', async () => {
    const comentaristaPost = require('../models/comentaristaModel/comentaristacreate');
    comentaristaPost.create.mockImplementation((data, callback) => callback(null, data));

    const res = await request(app)
      .post('/api/comments')
      .send({ comment: 'Great!' });

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.comment).toBe('Great!');
  });

  it('should return 501 if there is an error creating a comment', async () => {
    const comentaristaPost = require('../models/comentaristaModel/comentaristacreate');
    comentaristaPost.create.mockImplementation((data, callback) => callback(new Error('Database error')));

    const res = await request(app)
      .post('/api/comments')
      .send({ comment: 'Great!' });

    expect(res.statusCode).toEqual(501);
    expect(res.body.success).toBe(false);
  });

  it('should deactivate a comment by id', async () => {
    const comentaristaDel = require('../models/comentaristaModel/comentaristadelete');
    comentaristaDel.delete.mockImplementation((id, callback) => callback(null, { message: 'Comentario desactivado' }));

    const res = await request(app).delete('/api/comments/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Comentario desactivado');
  });

  it('should return 500 if there is an error deactivating a comment', async () => {
    const comentaristaDel = require('../models/comentaristaModel/comentaristadelete');
    comentaristaDel.delete.mockImplementation((id, callback) => callback(new Error('Database error')));

    const res = await request(app).delete('/api/comments/1');

    expect(res.statusCode).toEqual(500);
    expect(res.body.success).toBe(false);
  });
});
