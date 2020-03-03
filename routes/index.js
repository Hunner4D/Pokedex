var express = require('express');
var passport = require('passport');
var router = express.Router();
var initializeTrainerRoutes = require('../controllers/trainers.js');
var pokemon = require('../api/pokemon');

let mon;
let allmon = [];

/* GET home page. */
router.get('/', function(req, res) {
  const { user } = req;
  for (let i = 1; i <= 5; i ++) {
    grabPokemon(i);
  }
  console.log(allmon)
  return res.render('pokedex/index', { user, allmon });
});

async function grabPokemon(x) {
  let p = await pokemon.getPokemon('' + x);
  allmon.push(p)
}

// Stuff below added for google oauth

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    return res.redirect('/')
  }
);

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// api data grab

// router.get('/pokemon', async function(req, res) {
//   const r = await pokemon.getPokemon('ditto');
//   console.log(r);
//   res.redirect('/');
// });

router.get('/search', async function(req, res) {
  const searchedMon = req.query.pokesearch;
  mon = await pokemon.getPokemon(''+ searchedMon);
  console.log(mon);
  res.render('pokedex/showmon', { mon });
});



module.exports = router;
