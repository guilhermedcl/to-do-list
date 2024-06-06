const ToDoModel = require('../models/ToDoModel');

// pega todas as notas do banco de dados
module.exports.getToDo = async (req, res) => {
    try {
        const toDo = await ToDoModel.find().maxTimeMS(10000); // Aumenta o tempo limite para 10 segundos (10000 milissegundos)
        console.log("Notas do banco de dados:", toDo);
        res.json(toDo);
    } catch (error) {
        console.error("Erro ao buscar notas:", error);
        res.status(500).send("Erro interno do servidor");
    }
};

// salva uma nova nota no banco de dados
module.exports.saveToDo = async (req, res) => {
    const { text } = req.body;

    // verifica se o texto foi enviado
    if (!text) {
        return res.status(400).json({ error: "O texto é obrigatório" });
    }

    try {
        const newToDo = await ToDoModel.create({ text });
        console.log("Adicionado com sucesso...", newToDo); // loga a nota adicionada no console
        res.status(201).json(newToDo); // envia a nova nota como resposta
    } catch (error) {
        console.error("Erro ao adicionar nota:", error); // loga o erro no console
        res.status(400).json({ error: "Erro ao adicionar nota. Certifique-se de enviar os dados no formato correto." }); // envia uma resposta de erro
    }
};

// atualiza uma nota existente no banco de dados
module.exports.updateToDo = async (req, res) => {
    const { id } = req.params; // pega o id da nota da URL
    const { text } = req.body; // pega o novo texto do corpo da requisição

    // verifica se o id e o texto foram enviados
    if (!id || !text) {
        return res.status(400).json({ error: "ID e texto são obrigatórios" });
    }

    try {
        // atualiza a nota no banco de dados
        const updatedToDo = await ToDoModel.findByIdAndUpdate(id, { text }, { new: true });
        if (!updatedToDo) {
            return res.status(404).json({ error: "Nota não encontrada" }); // envia uma resposta de erro se a nota não for encontrada
        }
        res.json(updatedToDo); // envia a nota atualizada como resposta
    } catch (error) {
        console.error("Erro ao atualizar nota:", error); // loga o erro no console
        res.status(500).send("Erro interno do servidor"); // envia uma resposta de erro
    }
};

// deleta uma nota do banco de dados
module.exports.deleteToDo = async (req, res) => {
    const { id } = req.params; // pega o id da nota da URL

    // verifica se o id foi enviado
    if (!id) {
        return res.status(400).json({ error: "ID é obrigatório" });
    }

    try {
        const deletedToDo = await ToDoModel.findByIdAndDelete(id);
        if (!deletedToDo) {
            return res.status(404).json({ error: "Nota não encontrada" }); // envia uma resposta de erro se a nota não for encontrada
        }
        res.status(200).json({ message: "Nota excluída com sucesso" }); // envia uma mensagem de sucesso
    } catch (error) {
        console.error("Erro ao excluir nota:", error); // loga o erro no console
        res.status(500).json({ error: "Erro interno do servidor" }); // envia uma resposta de erro
    }
};
