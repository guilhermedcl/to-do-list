const NoteModel = require('../models/NoteModel');

// Controlador para buscar todas as notas
exports.getNote = async (req, res) => {
    try {
        const notes = await NoteModel.find();
        res.json(notes);
    } catch (error) {
        console.error("Erro ao buscar notas:", error);
        res.status(500).send("Erro interno do servidor");
    }
};

// Controlador para adicionar uma nova nota
exports.saveNote = async (req, res) => {
    try {
        const newNote = new NoteModel(req.body);
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        console.error("Erro ao adicionar nota:", error);
        res.status(400).json({ error: "Erro ao adicionar nota. Certifique-se de enviar os dados no formato correto." });
    }
};

// Controlador para atualizar uma nota
exports.updateNote = async (req, res) => {
    try {
        const updatedNote = await NoteModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedNote);
    } catch (error) {
        console.error("Erro ao atualizar nota:", error);
        res.status(500).send("Erro interno do servidor");
    }
};

// Controlador para excluir uma nota
exports.deleteNote = async (req, res) => {
    try {
        await NoteModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Nota excluída com sucesso" });
    } catch (error) {
        console.error("Erro ao excluir nota:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};