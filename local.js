var FsWebcam = require('./lib/fswebcam-wrapper.js');

var camera = new FsWebcam({
    device: '/dev/video1',
    rotate: 90,
    title: 'HomeSec',
    subtitle: 'Hallway#1'
});

camera.capture('wat.jpg');
