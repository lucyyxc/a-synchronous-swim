const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path dfor the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

var movement = ['up', 'down', 'left', 'right'];

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  console.log(req);
  if (req.method === 'GET') {
    res.write(movement[Math.floor(Math.random() * (movement.length))]);
  }

  res.writeHead(200, headers);//edit code: figure out what will happen in different scenarios
  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};


// use MVC to diagram
// think about how this is going to behave on all the possiblities the router can have, look at the tests for more scenarios
// keep referencing mock server