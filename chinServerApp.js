// Imports
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var disableCache = require(path.normalize(path.join(__dirname, "middlewares/disableCache")))

var nconf = require('nconf');
nconf.argv().env().file({ file: path.normalize(path.join(__dirname, "config.json")) });

// Create app
var app = express();

// Set static folder
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(disableCache);
app.use(require('./apis'));

var port = nconf.get('serverPort');
var server = app.listen(port);
console.log("Listening on port " + port);
