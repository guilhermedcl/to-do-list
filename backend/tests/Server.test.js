const request = require('supertest'); // importa supertest para testar o servidor
const app = require('../src/Server'); // importa o servidor Express

describe('Server', () => {
    it('deve retornar 404 para rotas desconhecidas', async () => {
      const response = await request(app).get('/rota-desconhecida');
      expect(response.status).toBe(404);
    });
  
    it('deve conectar ao MongoDB com sucesso', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({ message: 'Conectado ao MongoDB' }));
    });
  
    it('deve inicializar o servidor na porta especificada', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toContain(`Aplicação rodando na porta: ${process.env.PORT || 3000}`);
    });
  });
