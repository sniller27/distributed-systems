/** 
    MODULES
**/

//express for middleware(static files), POST/GET methods
var express = require('express')
var app = express()
//body parser for encoding and getting POST parameters (and maybe URL's)
var bodyParser = require('body-parser')
//path for static files (built-in module)
var path = require('path');
//http (built-in module)
var http = require('http');
//mongodb for data storage
var mongodb =  require('mongodb');
//mongoose makes it easier to communicate with mongodb
var mongoose = require('mongoose');

//artist class
var Artist = require('./Artist');

/** 
    VARIABLES
**/
const PORT= process.env.PORT || 8080;
var URLmongodb = 'mongodb://john:1234@ds137121.mlab.com:37121/artistdb';

/**
    MONGODB
**/
//Mongoose Connection
mongoose.connect(URLmongodb); // connect to our mongoDB database (uncomment after you enter in your own credentials in config/db.js)

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));

db.once("open", function (callback) {
  console.log("Connection succeeded.");
});

//Schema
var schema = new mongoose.Schema({
    
    id: Number,
    name: String,
    birthPlace: String,
    birthDate: String,
    favoritebool: String

});
//Model
var User = db.model('artists', schema);

/**
    USED MIDDLEWARE
**/

//static files
app.use('/public', express.static(path.join(__dirname, 'public')))
// app.use('/js', express.static(path.join(__dirname, 'js')));
// app.use('/css', express.static(path.join(__dirname, 'css')));

//body parser
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//Create and Start a server
//Must be at the and, first we create our handle functions and than we start the server
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
  User.find({'name' : new RegExp(nameparameter, 'i')}, function(err, users) {
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

  User.findById(artistid, function(err, user) {
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
  User.findOneAndRemove({_id : delid}, function(error) {
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