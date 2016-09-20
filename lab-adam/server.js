'use strict';

const net = require('net');
const Client = require(`${__dirname}/model/client`);
const wacks = require(`${__dirname}/lib/wacks   `);
const clientPool = require(`${__dirname}/lib/client-pool`);
const PORT = process.env.PORT || 3000;
const server = net.createServer();

server.on('connection', function(socket){
  var client = new Client(socket);
  clientPool.push(client);
  wacks('welcome',client);
  socket.on('data', function(data){
    const command = data.toString().split(' ').shift().trim();
    if (command.startsWith('\\')) {
      var name = data.toString().split(' ').slice(1,2).join(' ');
      var msg = data.toString().split(' ').slice(2).join(' ') || null;
      wacks(command, client, name, msg);
      return;
    }
    wacks('default', client, data.toString());
  });
  socket.on('error', (err) => {
    console.error(err);
  });
  socket.on('close', () => {
    wacks('close', client);
    wacks('\\all', client, 'Has left the chat room');
  });
});

server.listen(PORT, function(){
  console.log('Server listening on port ', PORT);
});
