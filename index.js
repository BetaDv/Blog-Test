
// LOAD DATABASE
const DB = require("./firebase")();

// LOAD WEBSERVER
const WS = require("./webserver/app")(DB);