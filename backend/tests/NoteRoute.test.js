const request = require('supertest');
const app = require('../src/Server'); // importa o aplicativo express configurado
const mongoose = require('mongoose');
const NoteModel = require('../src/models/NoteModel'); // importa o modelo Note

describe('rotas Note', () => {
  beforeAll(async () => {
    // conecta ao banco de dados antes dos testes
    await mongoose.connect(process.env.mongodb_url_test, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  });

  afterAll(async () => {
    // desconecta do banco de dados após os testes
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // limpa a coleção 'Notes' antes de cada teste
    await NoteModel.deleteMany({});
  });

  describe('get /', () => {
    it('deve retornar todas as notas', async () => {
      // cria algumas notas de teste no banco de dados
      const Notes = [
        { text: 'nota 1' },
        { text: 'nota 2' },
      ];
      await NoteModel.create(Notes);

      // faz uma requisição GET para a rota '/'
      const res = await request(app).get('/');

      // verifica se a resposta está correta
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0].text).toBe('nota 1');
      expect(res.body[1].text).toBe('nota 2');
    });
  });

  describe('post /save', () => {
    it('deve salvar uma nova nota', async () => {
      // define uma nova nota a ser enviada
      const newNote = { text: 'nova nota' };

      // faz uma requisição POST para a rota '/save' com a nova nota
      const res = await request(app)
        .post('/save')
        .send(newNote);

      // verifica se a resposta está correta
      expect(res.status).toBe(201);
      expect(res.body.text).toBe('nova nota');
    });

    it('deve retornar 400 se o texto estiver ausente', async () => {
      // faz uma requisição POST para a rota '/save' sem o campo 'text'
      const res = await request(app)
        .post('/save')
        .send({});

      // verifica se a resposta está correta
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('o texto é obrigatório');
    });
  });

  describe('put /update/:id', () => {
    it('deve atualizar uma nota existente', async () => {
      // cria uma nota no banco de dados para ser atualizada
      const note = await NoteModel.create({ text: 'nota para atualizar' });

      // define a nota atualizada
      const updatedNote = { text: 'nota atualizada' };

      // faz uma requisição PUT para a rota '/update/:id' com a nota atualizada
      const res = await request(app)
        .put(`/update/${note._id}`)
        .send(updatedNote);

      // verifica se a resposta está correta
      expect(res.status).toBe(200);
      expect(res.body.text).toBe('nota atualizada');
    });

    it('deve retornar 400 se o id ou o texto estiverem ausentes', async () => {
      // cria uma nota no banco de dados para testar o retorno de erro
      const note = await NoteModel.create({ text: 'nota para atualizar' });

      // faz uma requisição PUT para a rota '/update/:id' sem enviar dados válidos
      const res = await request(app)
        .put(`/update/${note._id}`)
        .send({});

      // verifica se a resposta está correta
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('id e texto são obrigatórios');
    });

    it('deve retornar 404 se a nota não for encontrada', async () => {
      // faz uma requisição PUT para a rota '/update/:id' com um id inválido
      const res = await request(app)
        .put('/update/123')
        .send({ text: 'nota atualizada' });

      // verifica se a resposta está correta
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('nota não encontrada');
    });
  });

  describe('delete /delete/:id', () => {
    it('deve excluir uma nota existente', async () => {
      // cria uma nota no banco de dados para ser deletada
      const note = await NoteModel.create({ text: 'nota para deletar' });

      // faz uma requisição DELETE para a rota '/delete/:id' com o id da nota
      const res = await request(app).delete(`/delete/${note._id}`);

      // verifica se a resposta está correta
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('nota excluída com sucesso');
    });

    it('deve retornar 400 se o id estiver ausente', async () => {
      // faz uma requisição DELETE para a rota '/delete/:id' sem enviar o id
      const res = await request(app).delete('/delete/');

      // verifica se a resposta está correta
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('id é obrigatório');
    });

    it('deve retornar 404 se a nota não for encontrada', async () => {
      // faz uma requisição DELETE para a rota '/delete/:id' com um id inválido
      const res = await request(app).delete('/delete/123');

      // verifica se a resposta está correta
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('nota não encontrada');
    });
  });
});
