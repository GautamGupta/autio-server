var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {

  request('https://api.spotify.com/v1/search?q=' + req.query['q'] + '&type=track&market=US&limit=10',
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body)
      var tracks = data.tracks.items
      var response = {
        'results': []
      }
      for(var i = 0; i < tracks.length; i++) {
        response.results.push({
          "id": tracks[i].id,
          "name": tracks[i].name,
          "artist": tracks[i].artists[0].name,
          "artwork": tracks[i].album.images[tracks[i].album.images.length - 1]
        })
      }
      res.json(response)
    } else {
      console.log(error)
      res.status(403)
    }
  })

});

module.exports = router;
