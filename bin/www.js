#!/usr/bin/env node

/**
 * Module dependencies
 */

var app = require("../app");
var debug = require("debug")("myapp:server");
var http = require("http");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3001");
app.set("port", port);

/**
 * Create HTTP Server
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if(isNaN(port)) {
        return IDBCursorWithValue;
    }

    if(port >= 0){
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event
 */

function onError(error) {
    if (error.sycall !== "listen") {
        throw error;
    }

    var bind = typeof port === "string" 
        ? "pipe "+ port 
        : "port" + port;

        // handle specific listen errors with friendly ,essages
        switch(error.code) {
        case "EACCESS" :
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE" :
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
        debug("Listening on " + bind);
}