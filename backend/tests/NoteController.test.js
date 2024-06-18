const NoteModel = require('../src/models/NoteModel');
const controller = require('../src/controllers/NoteController');

describe('NoteController', () => {
  describe('getNote', () => {
    it('should return all notes from the database', async () => {
        const mockNote = [{ id: '1', text: 'Note 1' }, { id: '2', text: 'Note 2' }];
        NoteModel.find = jest.fn().mockResolvedValue(mockNote);
        const req = {};
        const res = {
            json: jest.fn()
        };

        await controller.getNote(req, res);

        expect(NoteModel.find).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(mockNote);
    });

    it('should handle database error and return 500 status', async () => {
        const error = new Error('Database error');
        NoteModel.find = jest.fn().mockRejectedValue(error);
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        await controller.getNote(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Erro interno do servidor');
    });
});

    describe('saveNote', () => {
        it('should save a new note and return 201 status', async () => {
            const req = { body: { text: 'New note' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await controller.saveNote(req, res);

            expect(NoteModel.create).toHaveBeenCalledWith({ text: 'New note' });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalled();
        });

        it('should handle missing text and return 400 status', async () => {
            const req = { body: {} };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await controller.saveNote(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'O texto é obrigatório' });
        });

        it('should handle database error and return 400 status', async () => {
            NoteModel.create = jest.fn().mockRejectedValue(new Error('Database error'));
            const req = { body: { text: 'New note' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await controller.saveNote(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao adicionar nota. Certifique-se de enviar os dados no formato correto.' });
        });
    });
    describe('updateNote', () => {
      it('should update an existing note and return it', async () => {
          const req = { params: { id: '123' }, body: { text: 'Updated note' } };
          const updatedNote = { id: '123', text: 'Updated note' };
          NoteModel.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedNote);
          const res = { json: jest.fn() };
  
          await controller.updateNote(req, res);
  
          expect(NoteModel.findByIdAndUpdate).toHaveBeenCalledWith('123', { text: 'Updated note' }, { new: true });
          expect(res.json).toHaveBeenCalledWith(updatedNote);
      });
  
      it('should handle missing id or text and return 400 status', async () => {
          const req = { params: {}, body: { text: 'Updated note' } };
          const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
          };
  
          await controller.updateNote(req, res);
  
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith({ error: 'ID e texto são obrigatórios' });
      });
  
      it('should handle database error and return 500 status', async () => {
          const error = new Error('Database error');
          NoteModel.findByIdAndUpdate = jest.fn().mockRejectedValue(error);
          const req = { params: { id: '123' }, body: { text: 'Updated note' } };
          const res = {
              status: jest.fn().mockReturnThis(),
              send: jest.fn()
          };
  
          await controller.updateNote(req, res);
  
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.send).toHaveBeenCalledWith('Erro interno do servidor');
      });
  
      it('should handle note not found and return 404 status', async () => {
          NoteModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
          const req = { params: { id: '123' }, body: { text: 'Updated note' } };
          const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
          };
  
          await controller.updateNote(req, res);
  
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith({ error: 'Nota não encontrada' });
      });
  });
  
  describe('deleteNote', () => {
      it('should delete an existing note and return success message', async () => {
          const req = { params: { id: '123' } };
          const deletedNote = { id: '123', text: 'Note to delete' };
          NoteModel.findByIdAndDelete = jest.fn().mockResolvedValue(deletedNote);
          const res = { json: jest.fn() };
  
          await controller.deleteNote(req, res);
  
          expect(NoteModel.findByIdAndDelete).toHaveBeenCalledWith('123');
          expect(res.json).toHaveBeenCalledWith({ message: 'Nota excluída com sucesso' });
      });
  
      it('should handle missing id and return 400 status', async () => {
          const req = { params: {} };
          const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
          };
  
          await controller.deleteNote(req, res);
  
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith({ error: 'ID é obrigatório' });
      });
  
      it('should handle database error and return 500 status', async () => {
          const error = new Error('Database error');
          NoteModel.findByIdAndDelete = jest.fn().mockRejectedValue(error);
          const req = { params: { id: '123' } };
          const res = {
              status: jest.fn().mockReturnThis(),
              send: jest.fn()
          };
  
          await controller.deleteNote(req, res);
  
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.send).toHaveBeenCalledWith('Erro interno do servidor');
      });
  
      it('should handle note not found and return 404 status', async () => {
          NoteModel.findByIdAndDelete = jest.fn().mockResolvedValue(null);
          const req = { params: { id: '123' } };
          const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
          };
  
          await controller.deleteNote(req, res);
  
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith({ error: 'Nota não encontrada' });
      });
  });
  
});