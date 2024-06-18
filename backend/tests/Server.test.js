const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URL);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('MongoDB Connection', () => {
  it('should connect to MongoDB', async () => {
    // Verifica se a conexão já está estabelecida
    expect(mongoose.connection.readyState).toBe(1); // 1 significa que está conectado
  });

  it('should throw error on invalid MongoDB URL', async () => {
    // Desconecta do MongoDB para simular uma tentativa de conexão falhada
    await mongoose.disconnect();

    // Tenta conectar com uma URL inválida
    await expect(mongoose.connect('invalid-url')).rejects.toThrow();
  });
});
