var dejavu = require('dejavu'),
    utils  = require('./utils');

var roomManager = new (require('./roomManager'));

var worldHandler = dejavu.Class.declare({
  $name: 'worldHandler',
  __xtHandlers: {
    'm': {
      'checkName': 'handleCheckName'
    },
    's': {
      'js': 'handleJoinServer',
      'h': 'handleHeartbeat',
      'gi': 'handleGetInventory',
      'jr': 'handleJoinRoom'
    },
    'b': {
      'gb': 'handleGetBuddyList'
    }
  },

  initialize: function(){
    console.log('worldHandler initialized...');
  },

  handleData: function(data, client){
    var dataArr = data.split('%');
    dataArr.shift();

    var dataType = dataArr[1];
    var dataHandle = dataArr[2];
    var method = this.__xtHandlers[dataType][dataHandle];

    if(typeof this[method] == 'function'){
      this[method](dataArr, client);
    }
  },

  handleGetBuddyList: function(data, client){
    client.sendXt('gb', -1, 0);
  },

  handleJoinServer: function(data, client){
    client.sendXt('js', -1, 0, 1, 1);
    var roomObj = roomManager.getRoom(100);
    roomObj.addUser(client, [0, 0]);
  },

  handleJoinRoom: function(data, client){
    var roomObj = roomManager.getRoom(data[4]);
    roomObj.addUser(client, [data[5], data[6]]);
  },

  handleHeartbeat: function(data, client){
    client.sendXt('h', -1);
  },

  handleCheckName: function(data, client){
    client.sendXt('checkName', -1, 0);
  },

  handleLogin: function(data, client){
    client.write('<msg t="sys"><body action="logOK" r="0"></body></msg>');
  },

  handleRandomKey: function(data, client){

  },
  
  handleVersionCheck: function(data, client){
    client.write('<msg t="sys"><body action="apiOK" r="0"></body></msg>');
  }
});

module.exports = worldHandler;