const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue');

// Path dfor the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

// var movement = ['up', 'down', 'left', 'right'];
// path = path.join(__dirname, './background.jpg)
// stream = fs.createreadStream(path)
// res.write(movement[Math.floor(Math.random() * (movement.length))]);
// stream.on('open', () => {
  //res.writeHead(, Object.assign(headers, {'content-type': 'image/jpeg'}))
  //stream.pipe(res);
//})
//const movement = ['up', 'down', 'left', 'right'];
// res.write(movement[Math.floor(Math.random() * (movement.length))]);

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  // When GET request
  // send next message from messageQueue
  if (req.method === 'GET') {
    //check if url is /backgroundImage
    if (req.url === '/background.jpg') {
      const filePath = path.join(__dirname, '../spec/water-lg.jpg');
      const stream = fs.createReadStream(filePath);
      console.log(filePath);
      stream.on('open', () => {
        res.writeHead(200, Object.assign(headers, {'content-type': 'image/jpeg'}));
        stream.pipe(res);
      })
    } else {
      res.writeHead(200, headers);
      var dequeue = messages.dequeue();
      if (dequeue) {
        res.write(dequeue, function(err) {res.end()});
      }
    }
  }
  // res.end();
  next(); // invoke next() at the end of a request to help with testing!
};


// use MVC to diagram
// think about how this is going to behave on all the possiblities the router can have, look at the tests for more scenarios
// keep referencing mock server