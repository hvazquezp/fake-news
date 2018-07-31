var firebaseConnection = require('../common/firebase-connection');

var authService = {};

var signUp = function(email, password, name, firstLastName, secondLastName, username, token){
    return firebaseConnection.auth().createUserWithEmailAndPassword(email, password);
}

var login = function(email, password){
    return firebaseConnection.auth().signInWithEmailAndPassword(email,password);
}

authService.signUp = signUp;
authService.login = login;

module.exports = authService;