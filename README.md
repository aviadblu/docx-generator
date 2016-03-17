# docx-generator

## How to use:

```html

var docxGenerator = require('docx-generator');

var tmpFolder = '/tmp/folder';
// report web url
var url = 'http://yoursite.com';
// prepare crawler
var crawler = new docxGenerator.Crawler(url, tmpFolder);
// open url and get data
crawler.run()
.then(function(){
    // set result docx file name
    var name = 'file-' + new Date().getTime();
    // create docx object
    var docx = new docxGenerator.Docx(tmpFolder, path.join(__dirname, './output'), name);
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