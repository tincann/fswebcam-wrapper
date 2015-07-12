var spawn = require('child_process').spawn,
	path = require('path');

var convert_bin = __dirname + '/../bin/gm';
if(process.env.debug){
    convert_bin += '-x86';
}

function GifMaker(arguments, dirPath){
	this.arguments = arguments || {};
	this.dirPath = dirPath;
}

GifMaker.prototype.convertToGif = function(gifName, callback) {
	var arguments = serializeArguments(this.arguments);
	var gifPath = path.join(this.dirPath, gifName);
	arguments.push(path.join(this.dirPath, '*.jpg'));

	arguments.push(gifPath);

	console.log('making gif', gifPath);
	
    //gm convert {arguments}
    arguments.unshift('convert');

	var child = spawn(convert_bin, arguments);

	child.on('exit', function(){
		callback(gifPath);
	}.bind(this));
};


function serializeArguments(arguments){
    var args = [];
    for(var argumentName in arguments){
        args = args.concat(['-' + argumentName, arguments[argumentName]]);
    }
    return args;
}


module.exports = GifMaker;
