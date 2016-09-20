'use strict';

const expect = require('chai').expect;
const wacks = require(`${__dirname}/../lib/wacks`);
const clientPool = require(`${__dirname}/../lib/client-pool`);
const uuid = require('node-uuid');
const Client = require(`${__dirname}/../model/client.js`)
const net = require('net');
const server = net.createServer();

describe('Wack Commands Module', function(){
  describe('/nick function', function() {
    var preData, postData;
    before('start server and create dummy client connection', function(){
      server.on('connection', function(socket) {
        var client = new Client(socket);
        clientPool.push(client);
        socket.on('data', function(data){
          var command = data.toString().split(' ').slice(0);
          wacks(command, data);
        });
      });
      server.listen(3000, console.log('server running...'));
    });
    it('should connect to the launched server', function(done){
      var client = net.connect({port:3000},function(){
        client.write('\\nick adam');
      });
      client.on('data', function(data){
        clientPool.push(data);
      });
    });
    it('should change the nickname for a specific Client ID', function(done){
      // expect()
    });
  });
});
