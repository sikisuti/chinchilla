var path = require('path');
var nconf = require('nconf');

nconf.argv().env().file({ file: path.normalize(path.join(__dirname, "config.json")) });

module.exports = {

  getConfig: function(configName){
    return nconf.get(configName);
  }


};
