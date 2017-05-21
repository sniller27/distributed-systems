/** 
    MODULES
**/

//express for middleware(static files), POST/GET methods
var express = require('express')
var app = express()
//body parser for encoding and getting POST parameters (and maybe URL's)
var bodyParser = require('body-parser')
//path for static files (core module)
var path = require('path');
//http (core module)
var http = require('http');
//mongoose makes it easier to communicate with mongodb
var mongoose = require('mongoose');

//artist class
var Artist = require('./app/Artist');
var connectdb = require('./config/db.js');

//connect to mongodb
connectdb();

/**
    USED MIDDLEWARE
**/

//static files
app.use('/public', express.static(path.join(__dirname, 'public')));

//body parser
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//Create and Start a server
//Must be at the and, first we create our handle functions and than we start the server
const PORT= process.env.PORT || 8080;
var server = http.createServer(app);
server.listen(PORT, function(){
  console.log("Server listening on: http://localhost:%s", PORT);
});

/**
    ROUTING (GET/POST)
**/

//ENTRY-POINT (INDEX-PAGE)
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//READ ARTISTS
app.get('/artists', function(req, res){
var nameparameter = req.query.name;
  Artist.find({'name' : new RegExp(nameparameter, 'i')}, function(err, users) {
    if (err) throw err;

    res.json(users);
  });
});

//INSERT NEW ARTIST
app.post('/addartist', function(req, res){

  res.send(req.body);

  var newArtist = new Artist({
    id: 4,
    name: req.body.aname,
    birthPlace: req.body.abirthplace,
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


//JSON API
// var url = 'http://graph.facebook.com/517267866/?fields=picture';

// //hvad betyder res.end   (vises bare på skærmen?)
// app.get(url, function(res){
//     var body = '';

//     res.on('data', function(chunk){
//         body += chunk;
//     });

//     res.on('end', function(){
//         var fbResponse = JSON.parse(body);
//         console.log("Got a response: ", fbResponse.picture);
//     });
// }).on('error', function(e){
//       console.log("Got an error: ", e);
// });