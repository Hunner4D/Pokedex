const User = require('../models/pokemonDB');

module.exports = {
    add,
    delMon
}

function add(req, res) {
    if (req.user) {
        User.findById(req.user._id, function(err, user) {
            console.log('USER: ' + user)
            user.pokemon.push(req.body);
            user.save(function(e) {
                res.redirect('/mypokemon', )
            })
        })
    }
    else {
        res.redirect(`back`);
    }
}

function delMon(req, res) {
    User.findById(req.user._id, function(err, user) {
        user.pokemon.id(req.params.id).remove();
        user.save(function(e) {
            res.redirect('/mypokemon')
        });
    })
}