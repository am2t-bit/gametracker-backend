const mongoose = require('mongoose');

const resenaSchema = mongoose.Schema({
    juegoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Juego",
        required: true
    },
    texto: {
        type: String,
        required: true
    },
    estrellas: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Resena', resenaSchema);
