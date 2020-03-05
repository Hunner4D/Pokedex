var mongoose = require('mongoose');

var pokemonSchema = new mongoose.Schema({
  name: String,
  number: String,
  image: String
});

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  googleId: String,
  pokemon: [pokemonSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);