var express = require('express');
var router = express.Router();
var path = require('path');

var configManager = require(path.normalize(path.join(__dirname, "../configManager")));

router.get('/:configName', function(req, res){
  var config = configManager.getConfig(req.params.configName);
  res.send(config);
});

module.exports = router;
