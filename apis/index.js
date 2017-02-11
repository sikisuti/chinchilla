var express = require('express');
var router = express.Router();

router.use('/chinchilla', require('./chinchillaApi'));
router.use('/cage', require('./cageApi'));
router.use('/config', require('./configApi'));

module.exports = router;
