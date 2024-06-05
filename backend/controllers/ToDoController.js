const ToDoModel = require('../models/ToDoModel');

module.exports.getToDo = async (req, res) => {
    try {
      const toDo = await ToDoModel.find();
      console.log("Notes from database:", toDo); // Adicione este log
      res.json(toDo);
    } catch (error) {
      console.error("Error fetching notes:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  

module.exports.saveToDo = async (req, res) => {
    const { text } = req.body;

    try {
        const newToDo = await ToDoModel.create({ text });
        console.log("Adicionado com sucesso...", newToDo);
        res.status(201).json(newToDo);
    } catch (error) {
        console.error("Erro ao adicionar nota:", error);
        res.status(400).json({ error: "Erro ao adicionar nota. Certifique-se de enviar os dados no formato correto." });
    }
};

module.exports.updateToDo = async (req, res) => {
    const { id } = req.params; // Obter o ID da nota da URL
    const { text } = req.body; // Obter o novo texto do corpo da solicitação

    try {
        // Atualizar a nota no banco de dados
        const updatedToDo = await ToDoModel.findByIdAndUpdate(id, { text }, { new: true });

        if (!updatedToDo) {
            return res.status(404).json({ message: "Nota não encontrada" });
        }

        // Retornar a nota atualizada
        res.status(200).json(updatedToDo);
    } catch (error) {
        console.error("Erro ao atualizar nota:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};


module.exports.deleteToDo = async (req, res) => {
    const { id } = req.params; // Obter o ID da nota a ser excluída
    try {
        const deletedToDo = await ToDoModel.findByIdAndDelete(id);
        if (!deletedToDo) {
            return res.status(404).json({ message: "Nota não encontrada" });
        }
        res.status(200).json({ message: "Nota excluída com sucesso" });
    } catch (error) {
        console.error("Erro ao excluir nota:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};
