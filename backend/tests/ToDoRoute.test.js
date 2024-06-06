const request = require('supertest'); // Importa a biblioteca 'supertest' para fazer requisições HTTP simuladas
const express = require('express'); // Importa a biblioteca 'express' para criar o servidor web
const ToDoRoute = require('../src/routes/ToDoRoute'); // Importa as rotas relacionadas a ToDo
const ToDoController = require('../src/controllers/ToDoController'); // Importa o controlador relacionado a ToDo

const app = express(); // Cria uma instância do servidor Express
app.use(express.json()); // Middleware para permitir o parsing de JSON nas requisições
app.use('/todos', ToDoRoute); // Usa as rotas relacionadas a ToDo na rota '/todos'

jest.mock('../src/controllers/ToDoController'); // Mocks o controlador ToDoController

describe('ToDoRoute', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa todos os mocks entre os testes
  });

  describe('GET /todos', () => {
    it('should return all todos', async () => {
      ToDoController.getToDo.mockResolvedValue([{ text: 'Todo 1' }, { text: 'Todo 2' }]); // Simula a resolução da função getToDo retornando uma lista de todos

      const res = await request(app).get('/todos'); // Faz uma requisição GET para a rota '/todos'

      expect(res.status).toBe(200); // Verifica se o status da resposta é 200 (OK)
      expect(res.body).toEqual([{ text: 'Todo 1' }, { text: 'Todo 2' }]); // Verifica se o corpo da resposta contém a lista de todos esperada
    });

    it('should handle errors when getting todos', async () => {
      const errorMessage = 'Database error';
      ToDoController.getToDo.mockRejectedValue(new Error(errorMessage)); // Simula o lançamento de um erro ao obter todos

      const res = await request(app).get('/todos'); // Faz uma requisição GET para a rota '/todos'

      expect(res.status).toBe(500); // Verifica se o status da resposta é 500 (Erro interno do servidor)
      expect(res.text).toBe('Erro interno do servidor'); // Verifica se o corpo da resposta contém a mensagem de erro esperada
    });
  });

  // Repita o mesmo padrão para os outros endpoints
});
