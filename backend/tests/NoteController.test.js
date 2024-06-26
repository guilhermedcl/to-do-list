const NoteController = require('../src/controllers/NoteController');
const NoteModel = require('../src/models/NoteModel');


// Mock do modelo para evitar interações com o banco de dados real
jest.mock('../src/models/NoteModel');

describe('NoteController', () => {

  // Antes de cada teste, limpa o mock do NoteModel
  beforeEach(() => {
    NoteModel.mockClear();
  });

  // Depois de cada teste, restaura o estado dos mocks
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Teste para o método saveNote
  describe('saveNote', () => {
    it('should save a new note', async () => {
      const mockReqBody = { text: 'New note' };
      const mockSavedNote = {
        _id: 'mockId', // Simulando um ID gerado pelo MongoDB
        text: mockReqBody.text // O texto da nota enviado na requisição
      };

      // Mock do método save que resolve com mockSavedNote
      const saveMock = jest.fn().mockResolvedValue(mockSavedNote);

      // Configuração do mock do NoteModel para retornar um objeto com o método save
      NoteModel.mockImplementation(() => ({
        ...mockSavedNote,
        save: saveMock
      }));

      const req = { body: mockReqBody };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await NoteController.saveNote(req, res);

      expect(saveMock).toHaveBeenCalled(); // Verifica se o método save foi chamado no mock do NoteModel
      expect(res.status).toHaveBeenCalledWith(201); // Verifica se o status 201 (Created) foi enviado
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining(mockSavedNote)); // Verifica se mockSavedNote está contido na resposta
    });

    it('should handle errors in saveNote', async () => {
      const errorMessage = 'Erro ao adicionar nota';

      // Mock do método save que rejeita com um erro
      const saveMock = jest.fn().mockRejectedValue(new Error(errorMessage));

      // Configuração do mock do NoteModel para retornar um objeto com o método save
      NoteModel.mockImplementation(() => ({
        save: saveMock
      }));

      const req = { body: { text: 'New note' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await NoteController.saveNote(req, res);

      expect(saveMock).toHaveBeenCalled(); // Verifica se o método save foi chamado no mock do NoteModel
      expect(res.status).toHaveBeenCalledWith(400); // Verifica se o status 400 (Bad Request) foi enviado em caso de erro
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao adicionar nota. Certifique-se de enviar os dados no formato correto.' }); // Verifica a resposta de erro esperada
    });
  });
  
  // Teste para o método getNote
  describe('getNote', () => {
    it('should get all notes', async () => {
      const mockNotes = [{ text: 'Note 1' }, { text: 'Note 2' }];
      NoteModel.find.mockResolvedValue(mockNotes);

      const req = {};
      const res = {
        json: jest.fn()
      };

      await NoteController.getNote(req, res);

      expect(res.json).toHaveBeenCalledWith(mockNotes);
    });

    it('should handle errors in getNote', async () => {
      const errorMessage = 'Erro ao buscar notas';
      NoteModel.find.mockRejectedValue(new Error(errorMessage));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      await NoteController.getNote(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Erro interno do servidor');
    });
  });

  // Teste para o método updateNote
  describe('updateNote', () => {
    it('should update a note', async () => {
      const updatedNote = { _id: 'someId', text: 'Updated note' };
      NoteModel.findByIdAndUpdate.mockResolvedValue(updatedNote);

      const req = {
        params: { id: 'someId' },
        body: { text: 'Updated note' }
      };
      const res = {
        json: jest.fn()
      };

      await NoteController.updateNote(req, res);

      expect(res.json).toHaveBeenCalledWith(updatedNote);
    });

    it('should handle errors in updateNote', async () => {
      const errorMessage = 'Erro ao atualizar nota';
      NoteModel.findByIdAndUpdate.mockRejectedValue(new Error(errorMessage));

      const req = {
        params: { id: 'someId' },
        body: { text: 'Updated note' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      await NoteController.updateNote(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Erro interno do servidor');
    });
  });

  // Teste para o método deleteNote
  describe('deleteNote', () => {
    it('should delete a note', async () => {
      NoteModel.findByIdAndDelete.mockResolvedValue({});

      const req = { params: { id: 'someId' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await NoteController.deleteNote(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Nota excluída com sucesso' });
    });

    it('should handle errors in deleteNote', async () => {
      const errorMessage = 'Erro ao excluir nota';
      NoteModel.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));

      const req = { params: { id: 'someId' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await NoteController.deleteNote(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro interno do servidor' });
    });
  });

});