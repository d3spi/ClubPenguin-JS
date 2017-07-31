var dejavu = require('dejavu');

var roomBase = dejavu.Class.declare({
  $name: 'roomBase',
  __id: 9999,
  __maxUsers: 50,
  __clients: [],

  initialize: function(id, maxUsers){
    this.set('__id', id);
    this.set('__maxUsers', maxUsers);
  },

  addUser: function(client, coords){
    this.__clients.push(client);
    client.set('room', this.__id);
    client.set('x', coords[0]);
    client.set('y', coords[1]);
    this.sendXt('ap', -1, client.buildPlayerString());
    if(this.__clients.length > 1){
      client.sendXt('jr', -1, this.__id, this.__buildRoomString());
    } else {
      client.sendXt('jr', -1, this.__id);
    }
  },

  removeUser: function(client){
    var index = this.__clients.indexOf(client);
    if(index > -1){
      this.__clients.splice(index, 1);
      this.sendXt('rp', -1, client.get('id'));
    }
  },

  sendXt: function(){
    var args = Array.prototype.join.call(arguments, '%');
    this.sendData('%xt%' + args + '%');
  },

  sendData: function(data){
    this.__clients.forEach(function(client){
      client.write(data);
    });
  },

  __buildRoomString: function(room){
    var roomStr = '';
    this.__clients.forEach(function(client){
      roomStr += '%' + client.buildPlayerString();
    });
    return roomStr.substr(1);
  },

  set: function(key, val){
    this[key] = val;
    return this[key];
  },
  
  get: function(key){
    return this[key];
  }
});

module.exports = roomBase;