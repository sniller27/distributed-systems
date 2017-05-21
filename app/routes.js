var path = require('path');
var sanitizer = require('sanitizer');

var Artist = require('./Artist');

module.exports = function (app) { 

  //ENTRY-POINT (INDEX-PAGE)
  app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../', 'index.html'));
  });

  //READ ARTISTS
  app.get('/artists', function(req, res){
  var nameparameter = req.query.name;
  var nameparametersanitized = sanitizer.escape(nameparameter);
    Artist.find({'name' : new RegExp(nameparametersanitized, 'i')}, function(err, users) {
      if (err) throw err;

      res.json(users);
    });
  });

  //INSERT NEW ARTIST
  app.post('/addartist', function(req, res){

    res.send(req.body);

    //sanitizing
    var sanitizename = sanitizer.escape(req.body.aname);
    var sanitizebplace = sanitizer.escape(req.body.abirthplace);

    var newArtist = new Artist({
      id: 4,
      name: sanitizename,
      birthPlace: sanitizebplace,
      birthDate: req.body.abirthdate,
      favoritebool: req.body.afavorite
    });

    //Mongoose Save Funtktion to save data
    newArtist.save(function(error) {
      if (error) {
        console.error(error);
      }
    });

  });

  //UPDATE ARTIST
  app.post('/updateartist', function(req, res){

    res.send(req.body);
    var artistid = req.body.selectedid;

    Artist.findById(artistid, function(err, user) {
      if (err) throw err;

      user.favoritebool = req.body.afavorite;

      //saves the changes to db
      user.save(function(error) {
        if (error) {
          console.error(error);
        }
      });
    });

  });

  //DELETE ARTIST
  app.post('/deleteartist', function(req, res){

    res.send(req.body);
    var delid = req.body.selectedid;

     //Mongoose Save Funtktion to save data
    Artist.findOneAndRemove({_id : delid}, function(error) {
      if (error) {
        console.error(error);
      }
    });
    
  });

};
