var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

  if(req.query['action'] == "create") {

    res.json({"thing":"create session"})

  } else if(req.query['action'] == "join") {

    res.json({"thing":"join session"})

  } else if (req.query['action'] == "enqueue") {

    res.json({"thing":"enqueue track"})

  }

});

module.exports = router;
