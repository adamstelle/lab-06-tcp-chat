'use strict';

const EE = require('events');
const ee = new EE();
var clientPool = require(`${__dirname}/client-pool`);

module.exports = function(command, client, targetUser, message){
  ee.emit(command,client,targetUser,message);
};

ee.on('welcome', function(client, string){
  client.socket.write(`Welcome, ${client.nickname}! \n`);
});

ee.on('\\nick', function(client, string){
  client.nickname = string.trim();
  client.socket.write(`${client.nickname} \n`);
});

ee.on('\\all', function(client, string){
  clientPool.forEach( c => {
    c.socket.write(`${client.nickname}: ` + string + '\n');
  });
});

ee.on('\\dm', function(client, targetUser, message){
  var i = false;
  clientPool.forEach(c => {
    if (targetUser.trim() == c.nickname) {
      client.socket.write(`Message sent to ${c.nickname}! \n`);
      c.socket.write(`${client.nickname}: ${message} \n`);
      i = true;
    }
    if (i == false) client.socket.write(`Cannot find nickname ${targetUser} \n`);
  });
});

ee.on('\\r', function(client, string){
  clientPool.forEach( c => {
    var index = clientPool.indexOf(c);
    if (client.id == c.id) clientPool.splice(index, 1);
  });
});

ee.on('default', function(client, string){
  client.socket.write('not a command' + string +'');
});

// ee.on('quit',)

ee.on('close', function(client, string){
  clientPool.forEach( c => {
    var index = clientPool.indexOf(c);
    if (client.id == c.id) clientPool.splice(index, 1);
  });
});
