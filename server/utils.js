var crypto = require('crypto');

var utils = {
  generateKey: function(data){
    var hash = utils.md5(data);
    hash = hash.substr(0, 16);
    hash = utils.reverse(hash);
    hash += 'angrygardensalad';
    return utils.md5(hash);
  },

  md5: function(data){
    return crypto.createHash('md5').update(data).digest('hex');
  },
  
  reverse: function(data){
    return data.split('').reverse().join('');
  }
}

module.exports = utils;