const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const routes = require('../src/routes/NoteRoute');
const NoteModel = require('../src/models/NoteModel');

const app = express();
app.use(express.json());
app.use('/api', routes);

describe('NoteRoute', () => {
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    afterEach(async () => {
        await NoteModel.deleteMany({});
    });

    test('GET /api should get all notes', async () => {
        await NoteModel.create({ text: 'Test note' });
        const response = await request(app).get('/api');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    });

    test('POST /api/save should save a new note', async () => {
        const response = await request(app).post('/api/save').send({ text: 'Test note' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.text).toBe('Test note');
    });

    test('PUT /api/update/:id should update a note', async () => {
        const note = await NoteModel.create({ text: 'Old note' });
        const response = await request(app).put(`/api/update/${note._id}`).send({ text: 'Updated note' });
        expect(response.status).toBe(200);
        expect(response.body.text).toBe('Updated note');
    });

    test('DELETE /api/delete/:id should delete a note', async () => {
        const note = await NoteModel.create({ text: 'Note to delete' });
        const response = await request(app).delete(`/api/delete/${note._id}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Nota excluída com sucesso');
    });
});