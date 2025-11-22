const mongoose = require('mongoose');

const juegoSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    plataforma: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        default: false
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    portada: {
        type: String // URL de imagen
    }
});

module.exports = mongoose.model('Juego', juegoSchema);
