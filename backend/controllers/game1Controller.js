const Game1 = require('../models/game1Model');

// Controlador para obtener la colección de juegos
exports.getAllGames = async (req, res) => {
    try {
        const games = await Game1.find();
        res.send(games);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener la colección de juegos');
    }
};

exports.crearPartida = async (req, res) => {
    try {
      const partida = new Game1(req.body);
     
      await partida.save();
      res.json(partida);
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  };