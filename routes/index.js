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
  const promises = [];
  for (let i = 1; i <= 151; i ++) {
    promises.push(pokemon.getPokemon(i));
  }
  Promise.all(promises).then(results => {
    allmon = results;
    return res.render('pokedex/index', { user, allmon });
  });
});



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

router.get('/search', async function(req, res) {
  const searchedMon = req.query.pokesearch;
  mon = await pokemon.getPokemon(''+ searchedMon);
  console.log(mon);
  res.render('pokedex/showmon', { mon });
});



module.exports = router;
