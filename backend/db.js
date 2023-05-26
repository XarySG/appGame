const mongoose = require('mongoose');
const uri = "mongodb+srv://root:monlau2023@webfinal.7gkv72h.mongodb.net/Juegos";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected successfully.'))
  .catch(err => console.error('Connection error: ', err));

module.exports = mongoose.connection;
