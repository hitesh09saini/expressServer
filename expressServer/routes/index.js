var express = require('express');
var router = express.Router();
const { register, login } = require('../controllers/user.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', register);
router.post('/login', login);

module.exports = router;
