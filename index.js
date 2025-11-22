const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");

require('dotenv').config();

app.use(cors());
app.use(express.json());

MONGOD_URI='mongodb+srv://jovenescreativos:AngjYhQeY0KpTLuR@proyecto-final-jc.yhgniab.mongodb.net/angicita'

// Conexión a MongoDB
const conectarDB = async () => {
    try {
        await mongoose.connect(MONGOD_URI);
        console.log("Base de datos conectada =)");
    } catch (error) {
        console.error("Error conectando MongoDB:", error.message);
        process.exit(1);
    }
};

conectarDB();

const Juego = require('./modelos/Juego');

// Ruta base
app.get('/', (req, res) => {
    res.send("Backend funcionando con MongoDB");
});

// Servidor
app.listen(3000, () => {
    console.log(`Servidor ejecutándose en http://localhost:3000`);
});

//////////////////////

// Obtener todos los juegos
app.get('/juegos', async (req, res) => {
    const juegos = await Juego.find();
    res.json(juegos);
});

// Agregar un juego
app.post('/juegos', async (req, res) => {
    const nuevoJuego = new Juego(req.body);
    const juegoGuardado = await nuevoJuego.save();
    res.json(juegoGuardado);
});

// Editar un juego
app.put('/juegos/:id', async (req, res) => {
    const id = req.params.id;
    const juegoActualizado = await Juego.findByIdAndUpdate(id, req.body, { new: true });
    res.send(juegoActualizado);
});

// Eliminar un juego
app.delete('/juegos/:id', async (req, res) => {
    const id = req.params.id;
    const juegoEliminado = await Juego.findByIdAndDelete(id);
    res.send(juegoEliminado);
});

///////////////////////////////

const Resena = require('./modelos/Resena');

// Obtener reseñas
app.get('/resenas', async (req, res) => {
    const resenas = await Resena.find().populate("juegoId");
    res.json(resenas);
});

// Crear reseña
app.post('/resenas', async (req, res) => {
    const nuevaResena = new Resena(req.body);
    const resenaGuardada = await nuevaResena.save();
    res.json(resenaGuardada);
});

// Editar reseña
app.put('/resenas/:id', async (req, res) => {
    const id = req.params.id;
    const resenaActualizada = await Resena.findByIdAndUpdate(id, req.body, { new: true });
    res.send(resenaActualizada);
});

// Eliminar reseña
app.delete('/resenas/:id', async (req, res) => {
    const id = req.params.id;
    const resenaEliminada = await Resena.findByIdAndDelete(id);
    res.send(resenaEliminada);
});
