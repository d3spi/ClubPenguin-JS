var serverBase = require('./serverBase');

new serverBase('register', 6113);
new serverBase('game', 9875);

process.on('uncaughtException', function(err){
  console.error(err);
});