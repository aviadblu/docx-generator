'use strict';
var path = require('path');
var index_1 = require("./crawler/index");
var docx_1 = require("./lib/docx");
var tmpFolder = path.join(__dirname, '/../output/' + 'tmp-' + new Date().getTime());
// report web url
//var url = 'http://localhost:3030/headless/report-print/1/?TENANTID=aviad&phantom=true';
//var url = 'http://localhost:6012/headless/report-print/151/?TENANTID=403564594&phantom=true';
var url = 'http://localhost:6012/headless/report-print/231/?TENANTID=403564594&phantom=true';
// prepare crawler
var crawler = new index_1.Crawler(url, tmpFolder);
// open url and get data
crawler.run()
    .then(function () {
    // set result docx file name
    var name = 'file-' + new Date().getTime();
    // create docx object
    var docx = new docx_1.Docx(tmpFolder, path.join(__dirname, './output'), name);
    // get sections data from crawler output
    var sections = crawler.analyzeDOM(tmpFolder + '/data.html');
    // create docx section
    sections.forEach(function (sectionData) {
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
//
//var sections = crawler.analyzeDOM('/home/aviad/dev/docx-factory/output/tmp-1458132328643/data.html');
//console.log(sections);
//docx.addSection({
//    name: 'transactions',
//    description: 'The Transactions section provides detailed statistics on each transaction in your test.',
//    type: 'groupedTable',
//    tableCols: [
//        {
//            name: 'Transaction',
//            width: '20%'
//        },
//        {
//            name: '% Breakers',
//            width: '10%'
//        },
//        {
//            name: 'SLA Status',
//            width: '10%'
//        },
//        {
//            name: 'Avg duration',
//            width: '10%'
//        },
//        {
//            name: 'Min',
//            width: '10%'
//        },
//        {
//            name: 'Max',
//            width: '10%'
//        },
//        {
//            name: 'Std. Deviation',
//            width: '10%'
//        },
//        {
//            name: 'Passed',
//            width: '10%'
//        },
//        {
//            name: 'Failed',
//            width: '10%'
//        }
//    ],
//    tableRowsData: [
//        {
//            name: 'Script name: Peaceful App V2 (3)',
//            data: [
//                [
//                    'Search and Buy',
//                    '13.205',
//                    'Failed',
//                    '5.708',
//                    '3.317',
//                    '54.611',
//                    '3.257',
//                    '401,235',
//                    '28'
//                ],
//                [
//                    'Visit Home Page',
//                    '13.205',
//                    'Passed',
//                    '5.708',
//                    '3.317',
//                    '54.611',
//                    '3.257',
//                    '401,235',
//                    '28'
//                ],
//                [
//                    'Action_Transaction',
//                    '',
//                    'N/A',
//                    '5.708',
//                    '3.317',
//                    '54.611',
//                    '3.257',
//                    '401,235',
//                    '28'
//                ]
//            ]
//        },
//        {
//            name: 'Script name: second something...',
//            data: [
//                [
//                    'Search and Buy',
//                    '13.205',
//                    'Failed',
//                    '5.708',
//                    '3.317',
//                    '54.611',
//                    '3.257',
//                    '401,235',
//                    '28'
//                ],
//                [
//                    'Visit Home Page',
//                    '13.205',
//                    'Passed',
//                    '5.708',
//                    '3.317',
//                    '54.611',
//                    '3.257',
//                    '401,235',
//                    '28'
//                ],
//                [
//                    'Action_Transaction',
//                    '',
//                    'N/A',
//                    '5.708',
//                    '3.317',
//                    '54.611',
//                    '3.257',
//                    '401,235',
//                    '28'
//                ]
//            ]
//        }
//    ]
//}); 
//# sourceMappingURL=index.js.map