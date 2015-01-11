var spawn = require('child_process').spawn;

var config = {
    binary_path: __dirname + '/../bin/fswebcam'
};

function FsWebcam(arguments){
    this.arguments = arguments || {};
    serializeArguments(this.arguments);
}

FsWebcam.prototype.capture = function(filename) {
    var arguments = serializeArguments(this.arguments);

    if(filename){
        arguments.push(filename);
    }

    spawn(config.binary_path, arguments);
};

function serializeArguments(arguments){
    var args = [];
    for(var argumentName in arguments){
        args = args.concat(['--' + argumentName, arguments[argumentName]]);
    }
    return args;
}

module.exports = FsWebcam;
