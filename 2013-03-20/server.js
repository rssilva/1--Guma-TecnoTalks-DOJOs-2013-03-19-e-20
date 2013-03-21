// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
"use strict";
 
// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'keyboard';
 
// Port where we'll run the websocket server
var webSocketsServerPort = 1337;
 
// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');
var fs = require("fs");
var url = require("url");
 
/**
 * Global variables
 */

// list of currently connected clients (users)
 
/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
    // Not important for us. We're writing WebSocket server, not HTTP server
    console.log('request', request.url)

    request.on('end', function () {
        
        response.writeHead(200, {
             'Content-Type': 'text'
        });   

        if ((/keyboard/g).test(request.url)) {
            var url = 'js/keyboard.js';
            var fileContent = fs.readFileSync(url, 'utf8');
            
        } else if (request.url == '/') {
            var url = 'index.html';
            var fileContent = fs.readFileSync(url, 'utf8');
            
        }
        
             
        response.end(fileContent);
        
    });
}).listen(webSocketsServerPort, 500,function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});
 
/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket request is just
    // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server  
});
 
 var clients = [];

// WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('mensagem recebida');
            console.log(message.utf8Data);

            for (var i = clients.length - 1; i >=0; i--) {
                clients[i].send((message.utf8Data));
            }
        }
    });

    connection.on('close', function(connection) {
        // close user connection
    });
});



wsServer.on('connect', function(client){
    console.log('client connected');
    clients.push(client);
});