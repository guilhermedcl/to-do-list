// NoteController.test.js
const NoteController = require('../src/controllers/NoteController');
const NoteModel = require('../src/models/NoteModel');

jest.mock('../src/models/NoteModel');

describe('NoteController', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getNote', () => {
        it('deve retornar todas as notas do banco de dados', async () => {
            const notes = [{ _id: '1', title: 'Nota 1' }, { _id: '2', title: 'Nota 2' }];
            NoteModel.find.mockResolvedValue(notes);

            await NoteController.getNote(req, res);

            expect(NoteModel.find).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(notes);
        });

        it('deve lidar com erro de banco de dados e retornar status 500', async () => {
            const error = new Error('Database error');
            NoteModel.find.mockRejectedValue(error);

            await NoteController.getNote(req, res);

            expect(NoteModel.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Erro interno do servidor');
        });
    });

    describe('saveNote', () => {
        it('deve salvar uma nova nota e retornar status 201', async () => {
            req.body = { title: 'Nova Nota' };
            const newNote = { _id: '1', title: 'Nova Nota' }; // NoteModel mock retorna este objeto
            NoteModel.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(newNote)
            }));

            await NoteController.saveNote(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining(newNote));
        });

        it('deve lidar com erro de banco de dados e retornar status 400', async () => {
            req.body = { title: 'Nova Nota' };
            const error = new Error('Database error');
            NoteModel.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(error)
            }));

            await NoteController.saveNote(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Erro ao adicionar nota. Certifique-se de enviar os dados no formato correto." });
        });
    });

    describe('updateNote', () => {
        it('deve atualizar uma nota e retornar a nota atualizada', async () => {
            req.params = { id: '1' };
            req.body = { title: 'Nota Atualizada' };
            const updatedNote = { _id: '1', title: 'Nota Atualizada' };
            NoteModel.findByIdAndUpdate.mockResolvedValue(updatedNote);

            await NoteController.updateNote(req, res);

            expect(NoteModel.findByIdAndUpdate).toHaveBeenCalledWith('1', req.body, { new: true });
            expect(res.json).toHaveBeenCalledWith(updatedNote);
        });

        it('deve lidar com erro de banco de dados e retornar status 500', async () => {
            req.params = { id: '1' };
            req.body = { title: 'Nota Atualizada' };
            const error = new Error('Database error');
            NoteModel.findByIdAndUpdate.mockRejectedValue(error);

            await NoteController.updateNote(req, res);

            expect(NoteModel.findByIdAndUpdate).toHaveBeenCalledWith('1', req.body, { new: true });
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Erro interno do servidor');
        });
    });

    describe('deleteNote', () => {
        it('deve excluir uma nota e retornar uma mensagem de sucesso', async () => {
            req.params = { id: '1' };
            NoteModel.findByIdAndDelete.mockResolvedValue({});

            await NoteController.deleteNote(req, res);

            expect(NoteModel.findByIdAndDelete).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Nota excluída com sucesso' });
        });

        it('deve lidar com erro de banco de dados e retornar status 500', async () => {
            req.params = { id: '1' };
            const error = new Error('Database error');
            NoteModel.findByIdAndDelete.mockRejectedValue(error);

            await NoteController.deleteNote(req, res);

            expect(NoteModel.findByIdAndDelete).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Erro interno do servidor' });
        });
    });
});