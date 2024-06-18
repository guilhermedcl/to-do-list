const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes/NoteRoute'); // importa as rotas do Note
const app = express();

// carrega as variáveis de ambiente
dotenv.config();

// middleware para parsear json
app.use(express.json());

// middleware para habilitar cors
app.use(cors());

// conecta ao banco de dados MongoDB em memória para os testes
beforeAll(async () => {
  const mongoUri = process.env.mongodb_url;
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
});

// fecha a conexão com o banco de dados após todos os testes
afterAll(async () => {
  await mongoose.connection.close();
});

// define as rotas a serem usadas
app.use(routes);

describe('testes do servidor express', () => {
  it('deve responder na rota raiz (/)', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(404); // espera que a rota raiz retorne 404
  });

  it('deve iniciar o servidor na porta definida', async () => {
    const port = process.env.port || 3000;
    const server = app.listen(port);

    // verifica se o servidor está respondendo na porta definida
    await request(app)
      .get('/')
      .expect(404); // espera que a rota raiz retorne 404

    server.close();
  });

  it('deve salvar uma nova nota ao fazer uma requisição POST para /save', async () => {
    const newNote = { text: 'nova nota' };
    const response = await request(app)
      .post('/save')
      .send(newNote);

    expect(response.status).toBe(201); // espera que o status seja 201 (created)
    expect(response.body).toHaveProperty('_id'); // espera que a resposta contenha o campo _id
    expect(response.body.text).toBe('nova nota'); // espera que o texto retornado seja o mesmo enviado
  });

  it('deve retornar todas as notas ao fazer uma requisição GET para /', async () => {
    // insere algumas notas de teste no banco de dados
    await request(app).post('/save').send({ text: 'nota 1' });
    await request(app).post('/save').send({ text: 'nota 2' });

    const response = await request(app).get('/');
    expect(response.status).toBe(200); // espera que o status seja 200 (OK)
    expect(response.body.length).toBe(2); // espera que haja duas notas retornadas
    expect(response.body[0].text).toBe('nota 1'); // verifica o texto da primeira nota
    expect(response.body[1].text).toBe('nota 2'); // verifica o texto da segunda nota
  });
});
