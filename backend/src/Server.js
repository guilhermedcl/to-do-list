const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const routes = require('../src/routes/NoteRoute');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 7000; 

// middleware para parsear json
app.use(express.json());
// middleware para habilitar cors
app.use(cors());

// conecta ao banco de dados mongodb
mongoose.connect(process.env.MONGODB_URL);

// usa as rotas definidas
app.use('/api', routes); // Adicionando '/api' para evitar conflito com o frontend

// inicia o servidor na porta definida
app.listen(PORT);

module.exports = app;