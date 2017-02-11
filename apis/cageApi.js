var express = require('express');
var router = express.Router();
var path = require('path');

var db = require(path.normalize(path.join(__dirname, "../dbManager")));

router.get('/cages', function(req, res){
  db.cage.find({}).exec(function(err, cages){
    if (err) {console.log(err); res.sendStatus(500); return;}

    res.send(cages);
  });
});

module.exports = router;
