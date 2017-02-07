var Datastore = require('nedb');
var path = require('path');
var nconf = require('nconf');
nconf.argv().env().file({ file: path.normalize(path.join(__dirname, "config.json")) });

var db = {};

db.chin = new Datastore({
  filename: path.normalize(path.join(__dirname, nconf.get('chinDbPath'))),
  autoload: true,
  corruptAlertThreshold: 0 });

db.breed = new Datastore({
  filename: path.normalize(path.join(__dirname, nconf.get('breedDbPath'))),
  autoload: true,
  corruptAlertThreshold: 0 });

db.cage = new Datastore({
  filename: path.normalize(path.join(__dirname, nconf.get('cageDbPath'))),
  autoload: true,
  corruptAlertThreshold: 0 });

module.exports = db;
