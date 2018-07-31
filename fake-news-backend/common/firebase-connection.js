var firebase = require('firebase');
var dotenv = require('dotenv');

dotenv.config({ path: `${process.env.HOME}/firebase_credentials.env` });

var firebaseVariables = process.env;
var firebaseConf = {
    apiKey: firebaseVariables.FB_API_KEY,
    authDomain: firebaseVariables.FB_AUTH_DOMAIN,
    databaseUrl: firebaseVariables.FB_DATABASE_URL,
    projectId: firebaseVariables.FB_PROJECT_ID,
    storageBukect: firebaseVariables.FB_STORAGE_BUCKET,
    messagingSenderId: firebaseVariables.FB_MESSAGING_SENDER_ID
}
var firebaseConnection = firebase.initializeApp(firebaseConf);

module.exports = firebaseConnection;