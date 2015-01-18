var spawn = require('child_process').spawn;

var config = {
    fswebcam_bin: __dirname + '/../bin/fswebcam'
};

function FsWebcam(arguments){
    this.arguments = arguments || {};
}

FsWebcam.prototype.capture = function(filename, callback) {

    callback = callback || function() {};

    var arguments = serializeArguments(this.arguments);

    if(filename){
        arguments.push(filename);
    }
    
    var child = spawn(config.fswebcam_bin, arguments);

    child.on('exit', function(){
        console.log('captured image:', filename);
        callback();
    });
};

function serializeArguments(arguments){
    var args = [];
    for(var argumentName in arguments){
        args = args.concat(['--' + argumentName, arguments[argumentName]]);
    }
    return args;
}

module.exports = FsWebcam;
