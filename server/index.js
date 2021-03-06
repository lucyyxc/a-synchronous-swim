


const keypressHandler = require('./js/keypressHandler');
const messageQueue = require('./js/messageQueue.js')
// Will eventually need this callback to send message to client's http handler
// to update swim direction
keypressHandler.initialize(message => {
  console.log(`Message received: ${message}`);
  messageQueue.enqueue(message);
});

const httpHandler = require('./js/httpHandler');


const http = require('http');
const server = http.createServer(httpHandler.router);

const port = 3000;
const ip = '127.0.0.1';
server.listen(port, ip);

console.log('Server is running in the terminal!');
console.log(`Listening on http://${ip}:${port}`);
