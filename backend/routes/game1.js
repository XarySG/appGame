const express = require("express");
const router = express.Router();
const GameController = require("../controllers/game1Controller");
const Game1 = require("../models/game1Model");

// Endpoint para obtener la colección de juegos
router.get("/", GameController.getAllGames);

// Crear un nuevo juego
router.post('/', GameController.crearPartida);


module.exports = router;
