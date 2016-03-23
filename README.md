# docx-generator

## How to use:

```javascript
var path = require('path');
var docxGenerator = require('docx-generator');
// tmp folder
var tmpFolder = '/tmp/folder';
// output folder
var outputFolder = path.join(__dirname, './output');
// result docx file name
var fileName = 'file-' + new Date().getTime();
// report web url
var url = 'http://yoursite.com';
// prepare crawler
var crawler = new docxGenerator.Crawler(url, tmpFolder);

// open url and get data
crawler.run()
.then(function(){
    // create docx object
    var docx = new docxGenerator.Docx(tmpFolder, outputFolder, fileName);
    // get sections data from crawler output
    var sections = crawler.analyzeDOM(tmpFolder + '/data.html');
    // create docx section
    sections.forEach(function(sectionData){
        docx.addSection(sectionData);
    });
    // save result and pack as docx format
    return docx.create();

})
.then(function () {
    console.log('Done!');
})
.catch(function (error) {
    console.error(error);
});




```