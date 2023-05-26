const mongoose = require('mongoose');

const game2Schema = new mongoose.Schema({
  nombreMascota: {
    type: String,
    required: true
  },
  hambre: {
    type: Number,
    default: 100,
    min: 0,
    max: 100
  },
  energia: {
    type: Number,
    default: 100,
    min: 0,
    max: 100
  },
  felicidad: {
    type: Number,
    default: 100,
    min: 0,
    max: 100
  },
  fechaNacimiento: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false });

const Game2 = mongoose.model('Game2', game2Schema);

module.exports = Game2;
