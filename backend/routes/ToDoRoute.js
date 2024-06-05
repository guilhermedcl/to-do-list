const { Router } = require("express");
const { getToDo, saveToDo, updateToDo, deleteToDo } = require("../controllers/ToDoController");

const router = Router();

router.get('/', getToDo);
router.post('/save', saveToDo);
router.put('/update/:id', updateToDo); // Definir a rota PUT para a atualização com o ID na URL
router.delete('/delete/:id', deleteToDo); // Definir a rota DELETE com o ID na URL

module.exports = router;
