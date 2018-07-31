var express = require('express');
var authRouter = express.Router();
var firebase = require('firebase');

var firebaseApp = firebase.initializeApp();

authRouter.get('/', function (req, res) {
  res.json({ 'message': 'Welcome to the auth section' });
});

authRouter.post('/signup', function (req, res) {
  var { name, firstLastName, secondLastName, username, email, password, token } = req.body;
  if (!email || !password)
    res.json({ error: 'Email and password cannot be null or empty' });
  else
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function (data) {
      res.json({ data });
    }, function (error) {
      res.json({ error })
    })
});

authRouter.post('/login', function (req, res) {
  var { email, password } = req.body;
  if (!email || !password)
    res.json({ error: 'Email and password cannot be null or empty' });
  else
    firebase.auth().signInWithEmailAndPassword(email, password).then(function (data) {
      res.json({ data });
    }, function (error) {
      res.json({ error })
    })
});

module.exports = authRouter;
