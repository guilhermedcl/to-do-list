const NoteModel = require('../src/models/NoteModel'); // importa o modelo de nota
const controller = require('../src/controllers/NoteController'); // importa o controlador de nota

describe('NoteController', () => {
    describe('getNote', () => {
      it('should return all notes from the database', async () => {
          const mockNote = [{ id: '1', text: 'Note 1' }, { id: '2', text: 'Note 2' }]; // cria um mock de notas
          NoteModel.find = jest.fn().mockReturnValue({
              maxTimeMS: jest.fn().mockResolvedValue(mockNote) // define o mock para retornar as notas
          });
          const req = {};
          const res = {
              json: jest.fn()
          };
  
          await controller.getNote(req, res); // chama o método getNote do controller
  
          expect(NoteModel.find).toHaveBeenCalled(); // verifica se o método find foi chamado
          expect(res.json).toHaveBeenCalledWith(mockNote); // verifica se o método json foi chamado com as notas
      });
  
      it('should handle database error and return 500 status', async () => {
          const error = new Error('Database error');
          NoteModel.find = jest.fn().mockReturnValue({
              maxTimeMS: jest.fn().mockRejectedValue(error) // define o mock para simular erro de banco de dados
          });
          const req = {};
          const res = {
              status: jest.fn().mockReturnThis(), // define o mock para retornar próprio objeto
              send: jest.fn() // define o mock para enviar a resposta
          };
  
          await controller.getNote(req, res); // chama o método getNote do controller
  
          expect(res.status).toHaveBeenCalledWith(500); // verifica se retornou status 500
          expect(res.send).toHaveBeenCalledWith('Erro interno do servidor'); // verifica se enviou a mensagem de erro
      });
    });
  
    describe('saveNote', () => {
      it('should save a new note and return 201 status', async () => {
          const req = { body: { text: 'New note' } }; // define um objeto de requisição com texto
          const newNote = { id: '1', text: 'New note' }; // define a nova nota a ser criada
          NoteModel.create = jest.fn().mockResolvedValue(newNote); // define o mock para criar uma nova nota
          const res = {
              status: jest.fn().mockReturnThis(), // define o mock para retornar próprio objeto
              json: jest.fn() // define o mock para enviar a resposta
          };
  
          await controller.saveNote(req, res); // chama o método saveNote do controller
  
          expect(NoteModel.create).toHaveBeenCalledWith({ text: 'New note' }); // verifica se create foi chamado com os dados corretos
          expect(res.status).toHaveBeenCalledWith(201); // verifica se retornou status 201
          expect(res.json).toHaveBeenCalledWith(newNote); // verifica se enviou a nova nota como json
      });
  
      it('should handle missing text and return 400 status', async () => {
          const req = { body: {} }; // define um objeto de requisição vazio
          const res = {
              status: jest.fn().mockReturnThis(), // define o mock para retornar próprio objeto
              json: jest.fn() // define o mock para enviar a resposta
          };
  
          await controller.saveNote(req, res); // chama o método saveNote do controller
  
          expect(res.status).toHaveBeenCalledWith(400); // verifica se retornou status 400
          expect(res.json).toHaveBeenCalledWith({ error: 'O texto é obrigatório' }); // verifica se enviou o erro correto
      });
  
      it('should handle database error and return 400 status', async () => {
          NoteModel.create = jest.fn().mockRejectedValue(new Error('Database error')); // define o mock para simular erro de banco de dados
          const req = { body: { text: 'New note' } }; // define um objeto de requisição com texto
          const res = {
              status: jest.fn().mockReturnThis(), // define o mock para retornar próprio objeto
              json: jest.fn() // define o mock para enviar a resposta
          };
  
          await controller.saveNote(req, res); // chama o método saveNote do controller
  
          expect(res.status).toHaveBeenCalledWith(400); // verifica se retornou status 400
          expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao adicionar nota. Certifique-se de enviar os dados no formato correto.' }); // verifica se enviou a mensagem de erro correta
      });
    });
  
    describe('updateNote', () => {
      it('should update an existing note and return it', async () => {
          const req = { params: { id: '123' }, body: { text: 'Updated note' } }; // define um objeto de requisição com id e texto
          const updatedNote = { id: '123', text: 'Updated note' }; // define a nota atualizada
          NoteModel.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedNote); // define o mock para atualizar a nota
          const res = { json: jest.fn() }; // define o mock para enviar a resposta
  
          await controller.updateNote(req, res); // chama o método updateNote do controller
  
          expect(NoteModel.findByIdAndUpdate).toHaveBeenCalledWith('123', { text: 'Updated note' }, { new: true }); // verifica se update foi chamado com os parâmetros corretos
          expect(res.json).toHaveBeenCalledWith(updatedNote); // verifica se enviou a nota atualizada como json
      });
  
      it('should handle missing id or text and return 400 status', async () => {
          const req = { params: {}, body: { text: 'Updated note' } }; // define um objeto de requisição vazio
          const res = {
              status: jest.fn().mockReturnThis(), // define o mock para retornar próprio objeto
              json: jest.fn() // define o mock para enviar a resposta
          };
  
          await controller.updateNote(req, res); // chama o método updateNote do controller
  
          expect(res.status).toHaveBeenCalledWith(400); // verifica se retornou status 400
          expect(res.json).toHaveBeenCalledWith({ error: 'ID e texto são obrigatórios' }); // verifica se enviou o erro correto
      });
  
      it('should handle database error and return 500 status', async () => {
          const error = new Error('Database error');
          NoteModel.findByIdAndUpdate = jest.fn().mockRejectedValue(error); // define o mock para simular erro de banco de dados
          const req = { params: { id: '123' }, body: { text: 'Updated note' } }; // define um objeto de requisição com id e texto
          const res = {
              status: jest.fn().mockReturnThis(), // define o mock para retornar próprio objeto
              send: jest.fn() // define o mock para enviar a resposta
          };
  
          await controller.updateNote(req, res); // chama o método updateNote do controller
  
          expect(res.status).toHaveBeenCalledWith(500); // verifica se retornou status 500
          expect(res.send).toHaveBeenCalledWith('Erro interno do servidor'); // verifica se enviou a mensagem de erro
      });
  
      it('should handle note not found and return 404 status', async () => {
          NoteModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null); // define o mock para simular erro de banco de dados
          const req = { params: { id: '123' }, body: { text: 'Updated note' } }; // define um objeto de requisição com id e texto
          const res = {
              status: jest.fn().mockReturnThis(), // define o mock para retornar próprio objeto
              json: jest.fn() // define o mock para enviar a resposta
          };
  
          await controller.updateNote(req, res); // chama o método updateNote do controller
  
          expect(res.status).toHaveBeenCalledWith(404); // verifica se retornou status 404
          expect(res.json).toHaveBeenCalledWith({ error: 'Nota não encontrada' }); // verifica se enviou o erro correto
      });
    });
  
    describe('deleteNote', () => {
      it('should delete an existing note and return success message', async () => {
          const req = { params: { id: '123' } }; // define um objeto de requisição com id
          const deletedNote = { id: '123', text: 'Note to delete' }; // define a nota a ser deletada
          NoteModel.findByIdAndDelete = jest.fn().mockResolvedValue(deletedNote); // define o mock para deletar a nota
          const res = { json: jest.fn() }; // define o mock para enviar a resposta
  
          await controller.deleteNote(req, res); // chama o método deleteNote do controller
  
          expect(NoteModel.findByIdAndDelete).toHaveBeenCalledWith('123'); // verifica se findByIdAndDelete foi chamado com o id correto
          expect(res.json).toHaveBeenCalledWith({ message: 'Nota excluída com sucesso' }); // verifica se enviou a mensagem de sucesso
      });
  
      it('should handle missing id and return 400 status', async () => {
          const req = { params: {} }; // define um objeto de requisição vazio
          const res = {
              status: jest.fn().mockReturnThis(), // define o mock para retornar próprio objeto
              json: jest.fn() // define o mock para enviar a resposta
          };
  
          await controller.deleteNote(req, res); // chama o método deleteNote do controller
  
          expect(res.status).toHaveBeenCalledWith(400); // verifica se retornou status 400
          expect(res.json).toHaveBeenCalledWith({ error: 'ID é obrigatório' }); // verifica se enviou o erro correto
      });
  
      it('should handle database error and return 500 status', async () => {
          const error = new Error('Database error');
          NoteModel.findByIdAndDelete = jest.fn().mockRejectedValue(error); // define o mock para simular erro de banco de dados
          const req = { params: { id: '123' } }; // define um objeto de requisição com id
          const res = {
              status: jest.fn().mockReturnThis(), // define o mock para retornar próprio objeto
              send: jest.fn() // define o mock para enviar a resposta
          };
  
          await controller.deleteNote(req, res); // chama o método deleteNote do controller
  
          expect(res.status).toHaveBeenCalledWith(500); // verifica se retornou status 500
          expect(res.send).toHaveBeenCalledWith('Erro interno do servidor'); // verifica se enviou a mensagem de erro
      });
  
      it('should handle note not found and return 404 status', async () => {
          NoteModel.findByIdAndDelete = jest.fn().mockResolvedValue(null); // define o mock para simular erro de banco de dados
          const req = { params: { id: '123' } }; // define um objeto de requisição com id
          const res = {
              status: jest.fn().mockReturnThis(), // define o mock para retornar próprio objeto
              json: jest.fn() // define o mock para enviar a resposta
          };
  
          await controller.deleteNote(req, res); // chama o método deleteNote do controller
  
          expect(res.status).toHaveBeenCalledWith(404); // verifica se retornou status 404
          expect(res.json).toHaveBeenCalledWith({ error: 'Nota não encontrada' }); // verifica se enviou o erro correto
      });
    });
  });
