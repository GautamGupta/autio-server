var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Session = mongoose.model('Session',{
  name: String,
  members: [mongoose.model('Guest', {
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
    var session = new Session({
      name: req.query['first_name'],
      members: [],
      queue: []
    });

    session.save(function(error, data){
      if(error){
        res.json({
          status: "error",
          info: data
        });
      } else {
        res.json({
          status: "success",
          session_id: data._id
        });
      }
    });

  } else if(req.query['action'] == "join") {

    var member = new Member({
      name: req.query['first_name']
    })

    Session.findByIdAndUpdate(req.query['session_id'], {
      $push: { members: member }
    }, function (err, session) {
      if (err) {
        res.json({
          status: "error",
          info: err
        });
      } else {
        res.json({
          status: "success",
          "session": session
        });
      }
      res.send(tank);
    });


  } else if (req.query['action'] == "enqueue") {

    res.json({"thing":"enqueue track"});

  }

});

module.exports = router;
