var dejavu = require('dejavu');

var client = dejavu.Class.declare({
  $name: 'client',
  id: 99,
  __socket: null,
  _remoteAddress: null,
  
  initialize: function(socket){
    console.log('Client (' + socket.remoteAddress + ') created!');
    this.__socket = socket;
    this._remoteAddress = socket.remoteAddress;
  },

  buildPlayerString: function(){

  },

  write: function(data){
    console.log('Outgoing Data -> ' + data);
    this.__socket.write(data + '\0');
  },

  sendXt: function(){
    var args = Array.prototype.join.call(arguments, '%');
    this.write('%xt%' + args + '%');
  },

  set: function(key, val){
    this[key] = val;
    return this[key];
  },

  get: function(key){
    return this[key];
  }
});

module.exports = client;