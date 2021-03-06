var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var pi_socket_id;
var url = require('url');

app.listen(80, function(){
    console.log("server is now listenning at port 80..")
});

function handler (req, res) {
  console.log("handler function called")
  console.log("Method:", req.method)
  console.log("URL:", req.url)
  params = url.parse(req.url).query;
  console.log(params)
  request_url = url.parse(req.url).pathname;
  if (req.url == "/") {
    console.log("URL:", req.url)
    io.to(`${pi_socket_id}`).emit('led_on', {msg:'please turn on the led'});
    res.end(JSON.stringify({"turning off led":true}))
  }
  if (req.url == "/off") {
    console.log("URL:", req.url)
    io.to(`${pi_socket_id}`).emit('led_off', {msg:'please turn off the led'});
    res.end(JSON.stringify({"turning on led":true}))
  }
}

io.on('connection', function (socket) {
  console.log("socket "+ socket.id +" is connected.")
  socket.emit('connection confirm', { msg: 'you are now connected to the server through socket' });
//  switch_led_on(socket);
  socket.on("pi confirmed", function(msg){
    console.log("rasberry pi is connected");
    pi_socket_id = socket.id
  })
  socket.on("disconnect", function (){
      console.log("a socket is disconnected")
  })
});


