const mongoose = require('mongoose');
const ToDoModel = require('../models/toDoModel'); // importa o modelo ToDo

describe('todomodel', () => {
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
    // limpa a coleção 'todos' antes de cada teste
    await ToDoModel.deleteMany({});
  });

  it('deve criar e salvar um novo todo com sucesso', async () => {
    // cria um ToDo válido para ser salvo
    const validToDo = new ToDoModel({ text: 'nota de teste' });
    const savedToDo = await validToDo.save();

    // verifica se o ToDo foi salvo corretamente
    expect(savedToDo._id).toBeDefined();
    expect(savedToDo.text).toBe('nota de teste');
  });

  it('deve falhar ao salvar um todo sem campo obrigatório', async () => {
    // cria um ToDo inválido (sem o campo 'text' obrigatório)
    const invalidToDo = new ToDoModel({});
    let error;
    try {
      await invalidToDo.save();
    } catch (err) {
      error = err;
    }

    // verifica se ocorreu um erro de validação do Mongoose
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.text).toBeDefined();
  });
});
