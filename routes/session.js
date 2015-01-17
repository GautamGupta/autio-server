var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var MemberSchema = mongoose.Schema({
  name: String
});
var Member = mongoose.model('Member', MemberSchema);

var SongSchema = mongoose.Schema({
  spotify_id: String,
  owner_id: String,
  song_name: String,
  song_artist: String,
  song_artwork: String
});
var Song = mongoose.model('Song', SongSchema);

var SessionSchema = mongoose.Schema({
  name: String,
  members: [MemberSchema],
  queue: [SongSchema]
});
var Session = mongoose.model('Session', SessionSchema);

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


    Session.findById(req.query['session_id'], function (err, session) {

      if (err) {
        res.json({
          status: "error",
          info: err
        })
      }

      session.members.push({ name: req.query['first_name'] });

      session.save(function (err) {
        if (err) {
          res.json({
            status: "error",
            info: err
          })
        } else {
          res.json({
            status: "success",
            "session": session
          });
        }
      });

    });

  } else if (req.query['action'] == "enqueue") {

    res.json({"thing":"enqueue track"});

  }

});

module.exports = router;
