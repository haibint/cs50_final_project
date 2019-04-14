# Remote Control Connected LED

## Description
This is an self-made remote control LED. You can turn on/off An LED(Or essentially any electrical devices)
by pressing a button on your phone once you installed the Application. The application is written with React
Native and Expo, so it can compile into both android and ios application.

Three sets of codes were used in order to perform this function:
1. A could server that listen to http request when someone wants to turn the light on/off
2. A mobile application to send the http request
3. An Internert connected device that can run node.js with a relay and LED connected to actually turn on/off the light

## Usage

### cloud_server
```
cd cloud_server
npm install
```
This directory contains codes for a web server that reponse to http request that might be sent by a mobile phone,
web browser or other http request that command the LED to turn on. this is a node application that will live in a
cloud service like AWS. In my case, I put it on a server from Digital Ocean.

###  mobile_application
```
cd mobile_application
npm install
```
This directory contains an expo (React Native) project that compiles into android and ios Application that allows user
to send http request to the cloud server and then turn on/off LED through a physical relay.

### remote_led_raspberry
```
cd mobile_application
npm install
```
This directory contains a node.js application that needs to be run on an  to turn the LED on/off.
**The python script that needs to be run is not included in this repository as you might not be using a Raspberry Pi as I did, but I will a piece of sample code below that turn an LED(pin18) on with raspberry pi and Python**

```
import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(18,GPIO.OUT)
print "LED on"
GPIO.output(18,GPIO.HIGH)
```


