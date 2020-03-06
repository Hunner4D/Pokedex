const User = require('../models/pokemonDB');

module.exports = {
    add,
    delCom
}

function add(req, res) {
    if (req.user) {
        console.log(req.body);
        let pokeId = req.params.id;
        User.findById(req.user.id, function (err, user) {
            // console.log('USER: ' + user)
            console.log('user....', user);
            user.pokemon.forEach(p => {
                console.log('pokemon....', p);
                if (JSON.stringify(p._id) === JSON.stringify(pokeId)) {
                    try {
                        p.comments.push(req.body);
                        user.save(function (e) {
                            console.log('saving comment to schema');
                            res.redirect('/mypokemon')
                        })
                    } catch (error) {
                        console.error(`Something went wrong.\n${error.message}`);
                    }
                }
            });
        })
    }
    else {
        res.redirect(`back`);
    }
}

function delCom(req, res) {
    let pokeId = req.params.id;
    let comId = req.params.comment;
    console.log('comment id: ' + comId)

    User.findById(req.user._id, function (err, user) {
        user.pokemon.forEach(p => {
            console.log(p)
            if (JSON.stringify(p._id) === JSON.stringify(pokeId)) {
                p.comments.id(comId).remove();
                user.save(function (e) {
                    res.redirect('/mypokemon')
                });
            }
        })

    })
}
