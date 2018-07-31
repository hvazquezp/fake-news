var express = require('express');
var usersRouter = express.Router();

/* GET users listing. */

usersRouter.get('/', function(req, res){
  res.send('Welcome to the users API section');
});

usersRouter.get('/users', function(req, res, next) {
  res.send('List of users');
});

module.exports = usersRouter;
