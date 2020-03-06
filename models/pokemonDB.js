var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  comment: String
});

var pokemonSchema = new mongoose.Schema({
  name: String,
  number: String,
  image: String,
  comments: [commentSchema]
});

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  googleId: String,
  pokemon: [pokemonSchema]
},  {
    timestamps: true
  });

module.exports = mongoose.model('User', userSchema);