var spawn = require('child_process').spawn;
var fswebcam_bin = __dirname + '/../bin/fswebcam';

if(process.env.debug){
    fswebcam_bin += '-x86';
}


function FsWebcam(arguments){
    this.arguments = arguments || {};
}

FsWebcam.prototype.capture = function(filename, callback) {

    callback = callback || function() {};

    var arguments = serializeArguments(this.arguments);

    if(filename){
        arguments.push(filename);
    }
    
    var child = spawn(fswebcam_bin, arguments);

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
