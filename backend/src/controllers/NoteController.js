const NoteModel = require('../models/NoteModel');

// pega todas as notas do banco de dados
module.exports.getNote = async (req, res) => {
    try {
        const Note = await NoteModel.find().maxTimeMS(10000); // Aumenta o tempo limite para 10 segundos (10000 milissegundos)
        console.log("Notas do banco de dados:", Note);
        res.json(Note);
    } catch (error) {
        console.error("Erro ao buscar notas:", error);
        res.status(500).send("Erro interno do servidor");
    }
};

// salva uma nova nota no banco de dados
module.exports.saveNote = async (req, res) => {
    const { text } = req.body;

    // verifica se o texto foi enviado
    if (!text) {
        return res.status(400).json({ error: "O texto é obrigatório" });
    }

    try {
        const newNote = await NoteModel.create({ text });
        console.log("Adicionado com sucesso...", newNote); // loga a nota adicionada no console
        res.status(201).json(newNote); // envia a nova nota como resposta
    } catch (error) {
        console.error("Erro ao adicionar nota:", error); // loga o erro no console
        res.status(400).json({ error: "Erro ao adicionar nota. Certifique-se de enviar os dados no formato correto." }); // envia uma resposta de erro
    }
};

// atualiza uma nota existente no banco de dados
module.exports.updateNote = async (req, res) => {
    const { id } = req.params; // pega o id da nota da URL
    const { text } = req.body; // pega o novo texto do corpo da requisição

    // verifica se o id e o texto foram enviados
    if (!id || !text) {
        return res.status(400).json({ error: "ID e texto são obrigatórios" });
    }

    try {
        // atualiza a nota no banco de dados
        const updatedNote = await NoteModel.findByIdAndUpdate(id, { text }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ error: "Nota não encontrada" }); // envia uma resposta de erro se a nota não for encontrada
        }
        res.json(updatedNote); // envia a nota atualizada como resposta
    } catch (error) {
        console.error("Erro ao atualizar nota:", error); // loga o erro no console
        res.status(500).send("Erro interno do servidor"); // envia uma resposta de erro
    }
};

// deleta uma nota do banco de dados
module.exports.deleteNote = async (req, res) => {
    const { id } = req.params; // pega o id da nota da URL

    // verifica se o id foi enviado
    if (!id) {
        return res.status(400).json({ error: "ID é obrigatório" });
    }

    try {
        const deletedNote = await NoteModel.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ error: "Nota não encontrada" }); // envia uma resposta de erro se a nota não for encontrada
        }
        res.status(200).json({ message: "Nota excluída com sucesso" }); // envia uma mensagem de sucesso
    } catch (error) {
        console.error("Erro ao excluir nota:", error); // loga o erro no console
        res.status(500).json({ error: "Erro interno do servidor" }); // envia uma resposta de erro
    }
};
