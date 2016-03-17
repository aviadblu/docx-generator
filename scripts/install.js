var fs = require('fs-extra');
var path = require('path');
var exec = require('child_process').exec;

var masterZip = path.resolve(__dirname + '/../master.zip');
var distFolder = path.resolve(__dirname + '/../dist/lib');

function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

deleteFolderRecursive(distFolder + '/master/');

var unzipCmd = 'unzip ' + masterZip + ' -d ' + distFolder;
exec(unzipCmd, function (error, stdout, stderr) {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Creation success!');
    }
});