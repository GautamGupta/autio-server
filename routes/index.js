var express = require('express');
var router = express.Router();


router.get('/create-session', function(req, res) {
  res.json({"thing":"create session"})
});

router.get('/join-session', function(req, res) {
  res.json({"thing":"join session"})
});

router.get('/create-session', function(req, res) {
  res.json({"thing":"create session"})
});


module.exports = router;
