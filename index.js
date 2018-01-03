const SHA256 = require("crypto-js/sha256"),
      numCPUs = require('os').cpus().length,
      cluster =require('cluster'),
      cp = require('child_process'),
      app = require('express')(),
     server = require('http').createServer(app),
     io = require('socket.io')(server),
     ioc = require( 'socket.io-client' ),
     Blockchain =require ('./block.js');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork()
  });
} else {
server.listen(3000);
var client1 = ioc.connect( "http://localhost:" + 3001 )
var client2 = ioc.connect( "http://localhost:" + 3002 )
//// let blockChain = new Blockchain();
 let blockChain = 'hi2'
io.on('connection', function(rcvConn){
rcvConn.on('event',function(block){
    if(block){
        rcvConn.emit('valid',block)
    }


});

 });
// blockChain.addBlock(new Blockchain(1, "20/07/2017", { amount: 4 }));
 // connect with tcp clients client1
client1.once( "connect", function () {
    console.log( 'Client1: Connected to port '  );
  client1.emit( "event",blockChain );
  client1.disconnect();
 });
 client1.on('valid',function(block){
console.log("client1 is vaild")

 })
 /////////////////////////////////
 client2.once( "connect", function () {
    console.log( 'Client2: Connected to port ' );
  client2.emit( "event",blockChain );
  client2.disconnect();
 });
 client2.on('valid',function(block){
console.log("client2 is vaild")

 })

// let blockChain = new Blockchain();
// blockChain.addBlock(new Block(1, "20/07/2017", { amount: 4 }));
// blockChain.addBlock(new Block(2, "20/07/2017", { amount: 8 }));


// console.log('Blockchain valid? ' + blockChain.isChainValid());

// console.log('Changing a block...');
// blockChain.chain[1].data = { amount: 100 };
// console.log('Blockchain valid? ' + blockChain.isChainValid());
}
//console.dir("Now the block chain is "+ JSON.stringify(blockChain))
