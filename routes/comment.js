var express = require('express');
var router = express.Router();
var commentCTRL = require('../controllers/comment');

/* GET users listing. */
router.post('/:id', commentCTRL.add);
router.delete('/:id/:comment', commentCTRL.delCom);

module.exports = router;