var express = require('express');
var router = express.Router();
var pokemonCTRL = require('../controllers/pokemon');

/* GET users listing. */
router.post('/', pokemonCTRL.add);
router.delete('/:id', pokemonCTRL.delMon);

module.exports = router;