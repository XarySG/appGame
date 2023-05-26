const mongoose = require('mongoose');

const game1Schema = new mongoose.Schema({
    fecha: {
        type: Date,
        default: Date.now
    },
    jugador: {
        type: String,
        required: true
    },
    resultado: {
        type: String,
        required: true
    }
}, { versionKey: false });

const Game1 = mongoose.model('Game1', game1Schema);

module.exports = Game1;
