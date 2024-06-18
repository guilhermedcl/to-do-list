const mongoose = require('mongoose');

// define o esquema da nota
const noteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true // o campo texto é obrigatório
  }
});

// exporta o modelo da nota
module.exports = mongoose.model('Note', noteSchema);
