//const Gpio = require('onoff').Gpio;
//const led = new Gpio(7, 'out');

//console.log("writing 1 at GPIO 7")
//led.writeSync(1);
//console.log("writing 0 at GPIO 7")
//led.writeSync(0);


//trying to use shelljs to call python script instead.
var shell = require('shelljs');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io-client');

function turn_on_led() {
  if (shell.exec('python3 ../led_on.py').code !== 0) {
    shell.echo('shell command excution failed');
    shell.exit(1);
    }
  console.log("on function called");
}

function turn_off_led() {
  if (shell.exec('python3 ../led_off.py').code !== 0) {
    shell.echo('shell command excution failed');
    shell.exit(1);
    }
  console.log("off function called");
}

var socket =io.connect("http://128.199.210.235")

socket.on("connection confirm", function(msg){
    console.log(msg)
})

socket.emit("pi confirmed", {msg:"Hey I am rasberry pi."})

socket.on("led_on", function(msg){
    console.log(msg);
    turn_on_led();
})

socket.on("led_off", function(msg){
    console.log(msg);
    turn_off_led();
})

//app.get('/', function(req, res){
//  res.send('<h1>KW is calling me.</h1>');
//  turn_on_led();
//});

//app.get('/off', function(req, res){
//  res.send('<h1>calling stopped</h1>')
//  turn_off_led();
//})

//http.listen(80, function(){
//  console.log('listening on port 80');
//});

