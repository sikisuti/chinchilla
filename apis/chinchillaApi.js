var express = require('express');
var router = express.Router();
var path = require('path');

var db = require(path.normalize(path.join(__dirname, "../dbManager")));

router.get('/chinchillas', function(req, res){
  db.chin.find({}, function(err, doc){
    if(err) {console.log(err); res.sendStatus(500); return;}

    var i = 0;
    var today = new Date();
    doc.forEach(function(chin){

      addAgeType(chin, today);

      addMotherCageIds(chin, function(){
        addBreeder(chin, function(){
          addCages(chin, function(){
            if (++i == doc.length){
              res.send(doc);
            }
          });
        });
      });
    });
  });
});

var addAgeType = function(chin, today){
  var compareDate = new Date(chin.birthDate.getFullYear(), chin.birthDate.getMonth(), chin.birthDate.getDate(), 0, 0, 0, 0);
  compareDate.setDate(chin.birthDate.getDate() + 50);
  if (today < compareDate) {chin.ageType = 'Bébi';}
  else {
    compareDate = new Date(chin.birthDate.getFullYear(), chin.birthDate.getMonth(), chin.birthDate.getDate(), 0, 0, 0, 0);
    compareDate.setMonth(chin.birthDate.getMonth() + 8);
    if (today < compareDate) {chin.ageType = 'Növendék';}
    else {
      if (chin.pedigree == undefined) {chin.ageType = 'Tenyész növendék';}
      else {chin.ageType = 'Tenyészállat';}
    }
  }
};

var addMotherCageIds = function(chin, callback){
  if (chin.hasOwnProperty('motherID')){
    db.chin.findOne({"_id": chin.motherID}, function(err, mother){
      chin.motherCageIds = mother.cageIds;

      callback();
    });
  } else {
    callback();
  }
};

var addBreeder = function(chin, callback){
  db.breed.findOne({"_id": chin.breederId}, function(err, breeder){
    chin.breeder = breeder;
    chin.idNumber = chin.breeder.breederNumber + chin.birthYearChar + chin.yearCounter;

    callback();
  });
};

var addCages = function(chin, callback){
  if (chin.hasOwnProperty('cageIds')){
    db.cage.find({"_id": {$in: chin.cageIds}}, function(err, cages){

      chin.cages = cages;
      callback();
    });
  } else {
    callback();
  }
};

router.post('/chinchilla', function(req, res){
  var chin = req.body;
  chin.breeder = undefined;
  chin.cages = undefined;
  chin.ageType = undefined;
  chin.idNumber = undefined;
  chin.motherCageIds = undefined;
  chin.birthDate = new Date(req.body.birthDate);
  if (chin.separateDate != undefined) {chin.separateDate = new Date(req.body.separateDate);}
  if (chin.leave != undefined && chin.leave.leaveDate != undefined) {chin.leave.leaveDate = new Date(req.body.leave.leaveDate);}
  chin.lastModified = new Date();
  if (chin._id == undefined){
    db.chin.find({}).sort({"_id": -1}).limit(1).exec(function(err, chins){
      chin._id = chins[0]._id + 1;

      insertChin(chin, function(){
        res.sendStatus(200);
      });
    });
  } else {
    db.chin.remove({"_id": chin._id}, {}, function(err, numRemoved){
      insertChin(chin, function(){
        res.sendStatus(200);
      });
    });
  }
});

var insertChin = function(chin, callback){
  db.chin.insert(chin, function(err, newDoc){
    if (err) {console.log(err); res.sendStatus(500); return;}

    db.chin.persistence.compactDatafile();
    callback();
  });
};

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

router.get('/nextYearCounter', function(req, res){
  db.chin.find({breederId: parseInt(req.query.breederId), birthYearChar: req.query.yearChar}).sort({"yearCounter": -1}).limit(1).exec(function(err, chins){
    var counter;
    if (chins.length == 0) {
      counter = 1;
    } else {
      counter = chins[0].yearCounter + 1;
    }

    res.send({"counter": counter});
  });
});

module.exports = router;
