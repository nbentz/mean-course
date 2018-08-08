/*
// http is a default package installed with node
// require is NodeJS import syntax
//this is how we import packages in Node
const http = require('http');

//path to app.js file. Ommit .js in path.
const app = require('./backend/app');

//http package has a createServer method.
//createServer, takes in a req listener regardless if its domain or ip.
//res = response.

//multiline comment start
const server = http.createServer((req, res) => {
  //ends writing to the stream.
  res.end('This is my first response.');
});
*/

/*
const port = 3000 || process.env.PORT;

// sets configuration for express environment.
app.set('port', port);
const server = http.createServer(app);

//3000 is local host. Our hosting provider will typically
// provide us with a default port.
//to see results, type node server.js into cmd line.
//any changes, we need to CTRL + c and run node server.js again.
server.listen(port);
*/

const app = require("./app");
const debug = require("debug")("node-angular");
const http = require("http");

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

