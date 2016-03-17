var fs = require('fs-extra');
var path = require('path');
var exec = require('child_process').exec;

var masterZip = path.resolve(__dirname + '/master.zip');
var distFolder = path.resolve(__dirname + '/dist/lib/');
var unzipCmd = 'unzip ' + masterZip + ' -d ' + distFolder;
exec(unzipCmd, function (error, stdout, stderr) {
    if (error) {
        console.log(error);
    }
    else {
        console.log('success!');
    }
});