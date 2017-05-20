//for POST and GET
var express = require('express')
var app = express()

//body parser for encoding and getting POST parameters (and maybe URL's)?
var bodyParser = require('body-parser')

//path for static files (built-in module)
var path = require('path');
//http (built-in module)
var http = require('http');
var mongodb =  require('mongodb');
var mongoose = require('mongoose');
var Artist = require('./Artist');
var ws = require("nodejs-websocket");

//Mongoose Connection
mongoose.connect('mongodb://john:1234@ds137121.mlab.com:37121/artistdb'); // connect to our mongoDB database (uncomment after you enter in your own credentials in config/db.js)

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

db.once("open", function (callback) {
  console.log("Connection succeeded.");
});

//SCHEMA
var schema = new mongoose.Schema({
    
    id: Number,
    name: String,
    birthPlace: String,
    birthDate: String,
    favoritebool: String

});
//MODEL
var User = db.model('artists', schema);

//Handle all request from server
function handleRequest(request, response){
  console.log('handleRequest');
  response.end('Es läuft: ' + request.url);

  // get all the users
  User.find({}, function(err, users) {
    if (err) throw err;

    // object of all the users
    console.log(users);
    console.log(JSON.stringify(users));
  });
  //Here we will save our data
  //New Artist
  // var newArtist = new Artist({
  //   location: "reutlinge",
  //   bdate: "232/2",
  //   favorit: "michael j",
  //   uid:0
  // });

  // //Mongoose Save Funtktion to save data
  // newArtist.save(function(error) {
  //   if (error) {
  //     console.error(error);
  //   }
  // });

}

/**
    USED MIDDLEWARE
**/

//static files
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//body parser
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


//Create and Start a server
//Must be at the and, first we create our handle functions and than we start the server
const PORT=8080;
var server = http.createServer(app);
server.listen(PORT, function(){
  console.log("Server listening on: http://localhost:%s", PORT);
});

// var server = ws.createServer(function (conn) {

//     console.log("New connection")

//     conn.on("text", function (str) {
//         console.log("Received "+str)
//         conn.sendText(str.toUpperCase()+"!!!")
//     })

//     conn.on("close", function (code, reason) {
//         console.log("Connection closed")
//     })

// }).listen(PORT)


app.get('/', function(req, res){
  console.log('get meh');
  res.sendFile(__dirname + '/index.html');

});

app.get('/artists', function(req, res){
console.log(req.body)
var name = 'b';
  User.find({'name' : new RegExp(name, 'i')}, function(err, users) {
    if (err) throw err;

    // object of all the users
    console.log(users);
    console.log(JSON.stringify(users));
    res.json(users);
  });
  
});

app.post('/', function(req, res){
console.log('post meh');
  // var newArtist = new Artist({
  //   location: "helsinge",
  //   bdate: "33/2",
  //   favorit: "joes j",
  //   uid:0
  // });

  // //Mongoose Save Funtktion to save data
  // newArtist.save(function(error) {
  //   if (error) {
  //     console.error(error);
  //   }
  // });

});


//JSON API
var url = 'http://graph.facebook.com/517267866/?fields=picture';

app.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        var fbResponse = JSON.parse(body);
        console.log("Got a response: ", fbResponse.picture);
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});


//insert

  // var newArtist = new Artist({
  //   id: 3,
  //   name: "bo",
  //   birthPlace: "banjo gården",
  //   birthDate: "12/1-16",
  //   favoritebool: "false"
  // });

  // //Mongoose Save Funtktion to save data
  // newArtist.save(function(error) {
  //   if (error) {
  //     console.error(error);
  //   }
  // });