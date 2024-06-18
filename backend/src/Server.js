const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")


const routes = require('./routes/NoteRoute')

require('dotenv').config()

const app = express()
const PORT = process.env.port || 3000

// middleware para parsear json
app.use(express.json());
// middleware para habilitar cors
app.use(cors());

// conecta ao banco de dados mongodb
mongoose
.connect(process.env.MONGODB_URL)


// usa as rotas definidas
app.use(routes)

// inicia o servidor na porta definida
app.listen(PORT, () => console.log(`Aplicação rodando na porta: ${PORT}`))