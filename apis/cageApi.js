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

router.post('/cage', function(req, res){
  var cage = req.body;
  console.log(cage);
  db.cage.remove({"_id": cage._id}, {}, function(err, numRemoved){
    console.log('removed ' + numRemoved + ' item(s)');
    insertCage(cage, function(){
      console.log('cage inserted');
      res.sendStatus(200);
    });
  });
});

var insertCage = function(cage, callback){
  db.cage.insert(cage, function(err, newDoc){
    if (err) {console.log(err); res.sendStatus(500); return;}

    db.cage.persistence.compactDatafile();
    callback();
  });
};

module.exports = router;
