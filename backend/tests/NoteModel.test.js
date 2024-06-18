const mongoose = require('mongoose');
const NoteModel = require('../models/NoteModel'); // importa o modelo Note

describe('Notemodel', () => {
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

  it('deve criar e salvar um novo Note com sucesso', async () => {
    // cria um Note válido para ser salvo
    const validNote = new NoteModel({ text: 'nota de teste' });
    const savedNote = await validNote.save();

    // verifica se o Note foi salvo corretamente
    expect(savedNote._id).toBeDefined();
    expect(savedNote.text).toBe('nota de teste');
  });

  it('deve falhar ao salvar um Note sem campo obrigatório', async () => {
    // cria um Note inválido (sem o campo 'text' obrigatório)
    const invalidNote = new NoteModel({});
    let error;
    try {
      await invalidNote.save();
    } catch (err) {
      error = err;
    }

    // verifica se ocorreu um erro de validação do Mongoose
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.text).toBeDefined();
  });
});
