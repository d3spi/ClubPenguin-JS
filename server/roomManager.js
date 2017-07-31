var dejavu = require('dejavu');

var roomCrumbs = require('./crumbs/rooms.json');

var roomManager = dejavu.Class.declare({
  $name: 'roomManager',
  _rooms: [],
  
  initialize: function(){
    console.log('roomManager initialized...');
    var roomCount = 0;
    for(id in roomCrumbs){
      var roomObj = new (require('./roomBase'))(id, roomCrumbs[id].maxUsers);
      this._rooms[id] = roomObj;
      
      roomCount++;
    }
    console.log('[roomManager] -> ' + roomCount + ' rooms loaded!');
  },

  getRoom: function(id){
    return this._rooms[id];
  }
});

module.exports = roomManager;