const Game2 = require('../models/game2Model');

// Controlador para obtener la colección de juegos
exports.getAllGames = async (req, res) => {
    try {
        const games = await Game2.find();
        res.send(games);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener la colección de juegos');
    }
};

exports.createTamagotchi = async (req, res) => {
    try {
      const tamagotchi = new Game2(req.body)
      console.log(tamagotchi);
      console.log(req.body);
      await tamagotchi.save()
      res.status(201).json(tamagotchi)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }