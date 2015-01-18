var FsWebcam = require('./fswebcam-wrapper.js'), 
	GifMaker = require('./GifMaker.js'),
	path = require('path'),
	moment = require('moment'),
	fs = require('fs');

function Camera(arguments, imagePath){
	this.fswebcam = new FsWebcam(arguments);
	this.imagePath = imagePath;

	this.capturing = false;
	this.interval = null;
	this.captureDir = null;
}

Camera.prototype.capture = function(imgPath, callback) {
	this.fswebcam.capture(imgPath, callback);
};

Camera.prototype.startCapture = function(interval) {
	if(!this.capturing){
		console.log('Starting to capture');
		this.capturing = true;
		this.captureDir = this.getPath(moment().format('[series_]YYYY-MM-DD_HH-mm-ss[UTC]'));
		fs.mkdirSync(this.captureDir);
		
		this.interval = setInterval(function(){
			this.capture(path.join(this.captureDir, +new Date + '.jpg'));
		}.bind(this), interval);
	}else{
		console.log('Already capturing!');
	}
};

Camera.prototype.stopCapture = function(callback) {
	if(this.capturing){
		console.log('Stopping capturing');
		clearInterval(this.interval);
		this.makeAnimation('summary.gif', function(gifPath){
			this.capturing = false;
			this.captureDir = null;
			callback(gifPath);
		}.bind(this));
	}else{
		console.log('Not yet capturing');
	}
};

Camera.prototype.makeAnimation = function(gifName, callback) {
	var gifMaker = new GifMaker({ loop: 0, delay: 100}, this.captureDir);
	gifMaker.convertToGif(gifName, function(gifPath){
		callback(gifPath);
	}.bind(this));
};

Camera.prototype.getPath = function(name){
	return path.join(this.imagePath, name);
};

module.exports = Camera;
