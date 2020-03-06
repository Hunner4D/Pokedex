var express = require('express');
var passport = require('passport');
var router = express.Router();
var pokemon = require('../api/pokemon');
var User = require('../models/pokemonDB');
let mon;
let allmon = [];

/* GET home page. */
router.get('/', function (req, res) {
  const { user } = req;
  const promises = [];
  let rn = Math.floor((Math.random() * 801) + 1);
  for (let i = 1; i <= 151; i++) {
    promises.push(pokemon.getPokemon('pokemon/' + i));
  }
  Promise.all(promises).then(results => {
    allmon = results;
    return res.render('pokedex/index', { user, allmon, rn });
  });
});

router.get('/mypokemon', function (req, res) {
  if (req.user) {
    User.findById(req.user._id, function (e, user) {
      let pokes = user.pokemon;
      // let comments = user.pokemon.comments;
      res.render('pokedex/mypokemon', {
        user: req.user,
        pokemon: pokes,
      });
    })
  } else {
    res.redirect(`back`)
  }
});

router.get('/search', async function (req, res) {
  const searchedMon = req.query.pokesearch;
  mon = await pokemon.getPokemon('pokemon/' + searchedMon);
  desc = await pokemon.getPokemon('pokemon-species/' + searchedMon)
  let engArrDesc = desc.flavor_text_entries.filter(obj => obj.language.name == "en");
  let engArrTitle = desc.genera.filter(obj => obj.language.name == "en");
  res.render('pokedex/showmon', { mon, desc, engArrDesc, engArrTitle, user: req.user });
});

// Stuff below added for google oauth
// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    return res.redirect('/')
  }
);

// OAuth logout route
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});




module.exports = router;