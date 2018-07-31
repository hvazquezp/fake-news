var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var imageRouter = require('./routes/image');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function (req, res) {
  res.json({ message: '*Welcome to the Fake News API*' });
});

app.use('/api/image/', imageRouter);
app.use('/api', router);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.listen(port);
console.log('Magic happens on port :', port);
