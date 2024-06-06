const ToDoModel = require('../src/models/ToDoModel');
const controller = require('../src/controllers/ToDoController');

describe('ToDoController', () => {
  describe('getToDo', () => {
    it('should return all notes from the database', async () => {
        const mockToDo = [{ id: '1', text: 'Note 1' }, { id: '2', text: 'Note 2' }];
        ToDoModel.find = jest.fn().mockResolvedValue(mockToDo);
        const req = {};
        const res = {
            json: jest.fn()
        };

        await controller.getToDo(req, res);

        expect(ToDoModel.find).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(mockToDo);
    });

    it('should handle database error and return 500 status', async () => {
        const error = new Error('Database error');
        ToDoModel.find = jest.fn().mockRejectedValue(error);
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        await controller.getToDo(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Erro interno do servidor');
    });
});

    describe('saveToDo', () => {
        it('should save a new note and return 201 status', async () => {
            const req = { body: { text: 'New note' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await controller.saveToDo(req, res);

            expect(ToDoModel.create).toHaveBeenCalledWith({ text: 'New note' });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalled();
        });

        it('should handle missing text and return 400 status', async () => {
            const req = { body: {} };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await controller.saveToDo(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'O texto é obrigatório' });
        });

        it('should handle database error and return 400 status', async () => {
            ToDoModel.create = jest.fn().mockRejectedValue(new Error('Database error'));
            const req = { body: { text: 'New note' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await controller.saveToDo(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao adicionar nota. Certifique-se de enviar os dados no formato correto.' });
        });
    });
    describe('updateToDo', () => {
      it('should update an existing note and return it', async () => {
          const req = { params: { id: '123' }, body: { text: 'Updated note' } };
          const updatedToDo = { id: '123', text: 'Updated note' };
          ToDoModel.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedToDo);
          const res = { json: jest.fn() };
  
          await controller.updateToDo(req, res);
  
          expect(ToDoModel.findByIdAndUpdate).toHaveBeenCalledWith('123', { text: 'Updated note' }, { new: true });
          expect(res.json).toHaveBeenCalledWith(updatedToDo);
      });
  
      it('should handle missing id or text and return 400 status', async () => {
          const req = { params: {}, body: { text: 'Updated note' } };
          const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
          };
  
          await controller.updateToDo(req, res);
  
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith({ error: 'ID e texto são obrigatórios' });
      });
  
      it('should handle database error and return 500 status', async () => {
          const error = new Error('Database error');
          ToDoModel.findByIdAndUpdate = jest.fn().mockRejectedValue(error);
          const req = { params: { id: '123' }, body: { text: 'Updated note' } };
          const res = {
              status: jest.fn().mockReturnThis(),
              send: jest.fn()
          };
  
          await controller.updateToDo(req, res);
  
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.send).toHaveBeenCalledWith('Erro interno do servidor');
      });
  
      it('should handle note not found and return 404 status', async () => {
          ToDoModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
          const req = { params: { id: '123' }, body: { text: 'Updated note' } };
          const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
          };
  
          await controller.updateToDo(req, res);
  
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith({ error: 'Nota não encontrada' });
      });
  });
  
  describe('deleteToDo', () => {
      it('should delete an existing note and return success message', async () => {
          const req = { params: { id: '123' } };
          const deletedToDo = { id: '123', text: 'Note to delete' };
          ToDoModel.findByIdAndDelete = jest.fn().mockResolvedValue(deletedToDo);
          const res = { json: jest.fn() };
  
          await controller.deleteToDo(req, res);
  
          expect(ToDoModel.findByIdAndDelete).toHaveBeenCalledWith('123');
          expect(res.json).toHaveBeenCalledWith({ message: 'Nota excluída com sucesso' });
      });
  
      it('should handle missing id and return 400 status', async () => {
          const req = { params: {} };
          const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
          };
  
          await controller.deleteToDo(req, res);
  
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith({ error: 'ID é obrigatório' });
      });
  
      it('should handle database error and return 500 status', async () => {
          const error = new Error('Database error');
          ToDoModel.findByIdAndDelete = jest.fn().mockRejectedValue(error);
          const req = { params: { id: '123' } };
          const res = {
              status: jest.fn().mockReturnThis(),
              send: jest.fn()
          };
  
          await controller.deleteToDo(req, res);
  
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.send).toHaveBeenCalledWith('Erro interno do servidor');
      });
  
      it('should handle note not found and return 404 status', async () => {
          ToDoModel.findByIdAndDelete = jest.fn().mockResolvedValue(null);
          const req = { params: { id: '123' } };
          const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
          };
  
          await controller.deleteToDo(req, res);
  
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith({ error: 'Nota não encontrada' });
      });
  });
  
});
