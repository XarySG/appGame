const express = require("express");
const router = express.Router();
const GameController = require("../controllers/game2Controller");
const Game2 = require("../models/game2Model");

// Endpoint para obtener la colección de usuarios
router.get("/", GameController.getAllGames);

// Crear un nuevo juego
router.post('/', GameController.createTamagotchi);

module.exports = router;
