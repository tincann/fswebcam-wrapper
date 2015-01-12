var spawn = require('child_process').spawn;

var config = {
    binary_path: __dirname + '/../bin/fswebcam'
};

function FsWebcam(arguments){
    this.arguments = arguments || {};
}

FsWebcam.prototype.capture = function(filename, callback) {
    var arguments = serializeArguments(this.arguments);

    if(filename){
        arguments.push(filename);
    }

    var child = spawn(config.binary_path, arguments);

    child.on('exit', function(){
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
