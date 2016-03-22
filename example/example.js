var path = require('path');
var docxGenerator = require('../dist/index');

var tmpFolder = path.resolve('./tmp');
var fileOutputPath = path.resolve('./output');
var fileName = 'file-' + new Date().getTime();
var resPath = path.resolve('./crawler_res');

var crawler = new docxGenerator.Crawler('', resPath);
// create docx object
var docx = new docxGenerator.Docx(tmpFolder, fileOutputPath, fileName);
// get sections data from crawler output
var sections = crawler.analyzeDOM(resPath + '/data.html');
// create docx section
sections.forEach(function(sectionData){
    docx.addSection(sectionData);
});
// save result and pack as docx format
docx.create()
    .then(function(){
        console.log('done');
    })
    .catch(function (error) {
        console.error(error);
    });