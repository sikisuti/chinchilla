var express = require('express');
var router = express.Router();
var path = require('path');

var db = require(path.normalize(path.join(__dirname, "../dbManager")));

router.get('/chinchillas', function(req, res){
  db.chin.find({}, function(err, doc){
    if(err) {console.log(err); res.sendStatus(500); return;}

    var i = 0;
    doc.forEach(function(chin){
      db.breed.findOne({"_id": chin.breederId}, function(err, breeder){
        chin.breeder = breeder;

        if (chin.hasOwnProperty('cageIds')){
          db.cage.find({"_id": {$in: chin.cageIds}}, function(err, cages){

            chin.cages = cages;

            if (++i == doc.length){
              res.send(doc);
            }

          });
        } else {
          if (++i == doc.length){
            res.send(doc);
          }
        }

      });
    });
  });
});

router.get('/chinchilla/:id', function(req, res){
  db.chin.findOne({"_id": parseInt(req.params.id)}, function(err, chin){
    if (err) {console.log(err); res.sendStatus(500); return;}
    if (chin == null) {res.sendStatus(200); return;}

    if (chin.hasOwnProperty('breederId')) {
      db.breed.findOne({"_id": chin.breederId}, function(err, breeder){
        chin.breeder = breeder;
        res.send(chin);
      });
    } else {
      res.send(chin);
    }
  });
});

router.get('/breeders', function(req, res){
  db.breed.find({}, function(err, doc){
    if(err) {
      console.log(err);
    } else {
      res.send(doc);
    }
  });
});

module.exports = router;
