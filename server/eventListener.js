var dejavu = require('dejavu'),
    util = require('util'),
    parseString = require('xml2js').parseString;

var worldHandler = new (require('./worldHandler'));

var eventListener = dejavu.Class.declare({
  $name: 'eventListener',
  initialize: function(){
    console.log('eventListener initialized...');
  },
  
  analyze: function(data, client, serverType){
    var data = data.split('\0')[0];
    var dataType = (data.charAt(0) == '<' ? 0 : 1);

    if(dataType === 0){
      // XML data
      if(data == '<policy-file-request/>'){
        client.write('<cross-domain-policy><allow-access-from domain="*" to-ports="*" /></cross-domain-policy>');
      } else {
        parseString(data, {trim: true}, function(err, res){
          if(!err){
            var dataType = type = res.msg['$'].t;
            var dataAction = res.msg.body[0]['$'].action;

            switch(dataAction){
              case 'verChk':
                worldHandler.handleVersionCheck(data, client);
                break;
              case 'rndK':
                worldHandler.handleRandomKey(data, client);
                break;
              case 'login':
                if(serverType === 'register'){
                  // no need to verify login data
                  client.write('<msg t="sys"><body action="logOK" r="0"></body></msg>');
                } else {
                  worldHandler.handleLogin(data, client);
                }
                break;
            }
          }
        });
      }
    } else {
      console.log('Game data received');
      worldHandler.handleData(data, client);
    }
  }
});

module.exports = eventListener;