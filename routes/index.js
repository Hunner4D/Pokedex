var express = require('express');
var passport = require('passport');
var router = express.Router();
var pokemon = require('../api/pokemon');
var User = require('../models/pokemonDB');
let mon;
let allmon = [];

function randomNum() {
  let rn = Math.floor((Math.random() * 801) + 1);
  return rn
}

//-------------------------------------------------------------------
/* GET home page. */
router.get('/', function (req, res) {
  const { user } = req;
  const promises = [];
  const page = 2;
  for (let i = 1; i <= 151; i++) {
    promises.push(pokemon.getPokemon('pokemon/' + i));
  }
  Promise.all(promises).then(results => {
    allmon = results;
    return res.render('pokedex/index', { user, allmon, rn: randomNum(), page });
  });
});

router.get('/kanto', function (req, res) {
  const { user } = req;
  const promises = [];
  for (let i = 1; i <= 151; i++) {
    promises.push(pokemon.getPokemon('pokemon/' + i));
  }
  Promise.all(promises).then(results => {
    allmon = results;
    return res.render('pokedex/index', { user, allmon, rn: randomNum() });
  });
});

router.get('/johto', function (req, res) {
  const { user } = req;
  const promises = [];
  for (let i = 152; i <= 251; i++) {
    promises.push(pokemon.getPokemon('pokemon/' + i));
  }
  Promise.all(promises).then(results => {
    allmon = results;
    return res.render('pokedex/index', { user, allmon, rn: randomNum() });
  });
});

router.get('/hoenn', function (req, res) {
  const { user } = req;
  const promises = [];
  for (let i = 252; i <= 386; i++) {
    promises.push(pokemon.getPokemon('pokemon/' + i));
  }
  Promise.all(promises).then(results => {
    allmon = results;
    return res.render('pokedex/index', { user, allmon, rn: randomNum() });
  });
});

router.get('/sinnoh', function (req, res) {
  const { user } = req;
  const promises = [];
  for (let i = 387; i <= 493; i++) {
    promises.push(pokemon.getPokemon('pokemon/' + i));
  }
  Promise.all(promises).then(results => {
    allmon = results;
    return res.render('pokedex/index', { user, allmon, rn: randomNum() });
  });
});

router.get('/unova', function (req, res) {
  const { user } = req;
  const promises = [];
  for (let i = 494; i <= 649; i++) {
    promises.push(pokemon.getPokemon('pokemon/' + i));
  }
  Promise.all(promises).then(results => {
    allmon = results;
    return res.render('pokedex/index', { user, allmon, rn: randomNum() });
  });
});

router.get('/kalos', function (req, res) {
  const { user } = req;
  const promises = [];
  for (let i = 650; i <= 721; i++) {
    promises.push(pokemon.getPokemon('pokemon/' + i));
  }
  Promise.all(promises).then(results => {
    allmon = results;
    return res.render('pokedex/index', { user, allmon, rn: randomNum() });
  });
});

router.get('/alola', function (req, res) {
  const { user } = req;
  const promises = [];
  for (let i = 722; i <= 807; i++) {
    promises.push(pokemon.getPokemon('pokemon/' + i));
  }
  Promise.all(promises).then(results => {
    allmon = results;
    return res.render('pokedex/index', { user, allmon, rn: randomNum() });
  });
});
//---------------------------------------------------------------------------
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
  let userLoggedId;
  if (req.user === undefined) {
    userLoggedId = "target";
  }
  else {
    userLoggedId = "no-target";
  }
  res.render('pokedex/showmon', { mon, desc, engArrDesc, engArrTitle, user: req.user, userLoggedId });
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