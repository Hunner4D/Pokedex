const Trainer = require('../models/pokemonDB');

module.exports = {
    index
}

function index(req, res, next) {
    console.log(req.query)
    // Make the query object to use with Student.find based up
    // the user has submitted the search form or now
    let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    // Default to sorting by name
    let sortKey = req.query.sort || 'name';

    res.render('pokedex/index', { trainers, user: req.user, name: req.query.name, sortKey });
    // Trainer.find(modelQuery)
    // .sort(sortKey).exec(function(err, trainers) {
    //   if (err) return next(err);
    //   // Passing search values, name & sortKey, for use in the EJS
    //   res.render('pokedex/index', { trainers, user: req.user, name: req.query.name, sortKey });
    // });
  }