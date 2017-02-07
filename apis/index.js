var express = require('express');
var router = express.Router();

router.use('/chinchilla', require('./chinchillaApi'));

module.exports = router;
