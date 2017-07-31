var dejavu = require('dejavu'),
    net    = require('net');

var client        = require('./client');
var eventListener = new (require('./eventListener'));

var serverBase = dejavu.Class.declare({
  $name: 'serverBase',
  _type: 'game', // Server type [login, game, register]
  _port: 9999,
  clients: [],

  initialize: function(type, port){
    console.log('Server [' + type + '] initialized...');

    this._type = type;
    this._port = port;

    this.__createServer(type);
  },

  __createServer: function(serverType){
    var _this = this;
    net.createServer(function(socket){
      var clientObj = new client(socket);
      _this.clients.push(clientObj);

      socket.on('data', function(data){
        console.log('Data received -> ' + data);
        eventListener.analyze(data.toString(), clientObj, serverType);        
      });

      socket.on('end', function(){
        console.log('Client (' + socket.remoteAddress + ') disconnected...');
      });
    }).listen(this._port);
  },

  // Get, set methods
  get: function(key){
    return this[key];
  },
  
  set: function(key, val){
    this[key] = val;
    return this;
  }
});

module.exports = serverBase;
