/** 
    MODULES
**/
var WebSocketServer = require('websocket').server;
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
var connectdb = require('./config/db.js');
var routes = require('./app/routes.js');

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

//ENTRY-POINT (INDEX-PAGE)
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production 
    // applications, as it defeats all standard cross-origin protection 
    // facilities built into the protocol and the browser.  You should 
    // *always* verify the connection's origin and decide whether or not 
    // to accept it. 
    autoAcceptConnections: false
});
 
function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed. 
  return true;
}

wsServer.on('request', function(request) {

    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin 
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    // var connection = request.accept('echo-protocol', request.origin);
    
    // console.log((new Date()) + ' Connection accepted.');
    // connection.on('message', function(message) {
    //     if (message.type === 'utf8') {
    //         console.log('Received Message: ' + message.utf8Data);
    //         connection.sendUTF(message.utf8Data);
    //     }
    //     else if (message.type === 'binary') {
    //         console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
    //         connection.sendBytes(message.binaryData);
    //     }
    // });
    // connection.on('close', function(reasonCode, description) {
    //     console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    // });
	
	//routes
	routes(app, request);
});

