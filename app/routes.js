var path = require('path');
var sanitizer = require('sanitizer');

var Artist = require('./Artist');

module.exports = function (app) {

  //ENTRY-POINT (INDEX-PAGE)
  app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../', 'index.html'));
  });

  //READ ALL ARTISTS (GET)
  app.get('/api/artists', function(req, res){
  var nameparameter = req.query.name;
  var nameparametersanitized = sanitizer.escape(nameparameter);
    Artist.find({'name' : new RegExp(nameparametersanitized, 'i')}, function(err, users) {
      if (err) throw err;

      res.json(users);
    });
  });

  //READ SPECIFIC ARTISTS (GET)
  app.get('/api/artist', function(req, res){
  var nameparameter = req.query.name;
  // console.log(nameparameter);
  var nameparametersanitized = sanitizer.escape(nameparameter);
    Artist.find({'name' : new RegExp(nameparametersanitized, 'i')}, function(err, users) {
      if (err) throw err;

      res.json(users);
    });
  });

  //INSERT NEW ARTIST (POST)
  app.post('/api/artist', function(req, res){

    res.send(req.body);

    //sanitizing
    var sanitizename = sanitizer.escape(req.body.name);
    var sanitizebplace = sanitizer.escape(req.body.birthPlace);

    var newArtist = new Artist({
      // id: 4,
      name: sanitizename,
      birthPlace: sanitizebplace,
      birthDate: req.body.birthDate,
      favoritebool: req.body.favoritebool
    });
    //Mongoose Save Funtktion to save data
    newArtist.save(function(error) {
      if (error) {
        console.error(error);
      }
    });

  });

  //UPDATE ARTIST (PUT)
  app.put('/api/artist', function(req, res){

    res.send(req.body);
    var artistid = req.body.selectedid;

    Artist.update({'id': artistid}, {
        favoritebool: req.body.afavorite
    }, function(err, numberAffected, rawResponse) {
       //handle it
    })

  });

  //DELETE ARTIST
  app.delete('/api/artist', function(req, res){

    res.send(req.body);
    var delid = req.body.selectedid;

     //Mongoose Save Funtktion to save data
    Artist.findOneAndRemove({id : delid}, function(error) {
      if (error) {
        console.error(error);
      }
    });
    
  });

};
