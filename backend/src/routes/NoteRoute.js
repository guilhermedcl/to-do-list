const { Router } = require("express");
const { getNote, saveNote, updateNote, deleteNote } = require("../controllers/NoteController");

const router = Router();

// definindo as rotas
router.get('/', getNote);
router.post('/save', saveNote);
router.put('/update/:id', updateNote);
router.delete('/delete/:id', deleteNote);

module.exports = router;
