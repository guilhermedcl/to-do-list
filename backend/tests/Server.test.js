const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/Server');

describe('Server', () => {
  let server;

  beforeAll(() => {
    server = app.listen(7777);
  });

  afterAll((done) => {
    mongoose.disconnect();
    server.close(done);
  });

  test('GET /api should return 200 status', async () => {
    const response = await request(server).get('/api');
    expect(response.status).toBe(200);
  });
});