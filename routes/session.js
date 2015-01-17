var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Session = mongoose.model('Session',{
  name: String,
  members, [mongoose.model('Guest', {
    name: String
  })],
  queue: [mongoose.model('Song', {
    spotify_id: String,
    owner_id: String,
    song_name: String,
    song_artist: String,
    song_artwork: String
  })]
});

router.get('/', function(req, res) {

  if(req.query['action'] == "create") {

    //Push to mongo the session

  } else if(req.query['action'] == "join") {

    res.json({"thing":"join session"});

  } else if (req.query['action'] == "enqueue") {

    res.json({"thing":"enqueue track"});

  }

});

module.exports = router;
