'use strict';
var path = require('path');
var fs = require('fs');
var childProcess = require('child_process');
var slimerjs = require('slimerjs');
var binPath = slimerjs.path;
var Emitter = require('events').EventEmitter;
var Q = require('q');
var cheerio = require('cheerio');
var _ = require('lodash');
var Crawler = (function () {
    function Crawler(url, tmp) {
        this.sectionTypeReaderMap = {
            'table': this.readTableSection,
            'widget': this.readWidgetSection,
            'distribution': this.readDistributionSection
        };
        this.url = url;
        this.tmp = tmp;
        this.events = Object.create(Emitter.prototype);
        // create tmp folder
        fs.mkdir(tmp, '0755', function (e) { });
    }
    Crawler.makeTextPlain = function (txt) {
        //return txt.trim().replace(/\n/g, '').replace(/\t/g, '');
        return txt.trim();
    };
    Crawler.prototype.readTableSection = function (sectionDOM) {
        var _self = this;
        var table = sectionDOM.find('table');
        var thead = table.find('thead');
        var tbody = table.find('tbody');
        var rows = table.find('tbody').find('tr');
        var colsCounter = 0;
        for (var i = 0; i < rows['0'].children.length; i++) {
            var el = rows['0'].children[i];
            if (el.type === 'tag' && el.name === 'td') {
                colsCounter++;
            }
        }
        var colWidth = Math.floor(100 / colsCounter);
        var firstColWidth = 100 - colWidth * (colsCounter - 1);
        var tableCols = [];
        var tableRowsData = [];
        // init tableCols
        var c = 0;
        for (var i = 0; i < colsCounter; i++) {
            tableCols.push({
                width: (c == 0 ? firstColWidth + '%' : colWidth + '%')
            });
            c++;
        }
        // get head if exists
        if (thead.length) {
            tableCols = [];
            var thArr = thead.find('th');
            var colWidth = Math.floor(100 / thArr.length);
            var firstColWidth = 100 - colWidth * (thArr.length - 1);
            var header;
            var c_1 = 0;
            thArr.each(function (key, value) {
                header = value.children[0] ? value.children[0].data : '-';
                tableCols.push({
                    name: Crawler.makeTextPlain(header),
                    width: (c_1 == 0 ? firstColWidth + '%' : colWidth + '%')
                });
                c_1++;
            });
        }
        // fill table data
        Object.keys(rows).forEach(function (key) {
            var rowJQ = cheerio.load(rows[key]);
            var rowArr = [];
            //console.log(rowJQ('td'));
            rowJQ('td').each(function (key, value) {
                var cellJQ = cheerio.load(value);
                rowArr.push(Crawler.makeTextPlain(cellJQ(this).text()));
            });
            if (rowArr.length) {
                tableRowsData.push(rowArr);
            }
        });
        return {
            tableCols: tableCols,
            tableRowsData: tableRowsData
        };
    };
    Crawler.prototype.readWidgetSection = function (sectionDOM) {
        var returnData = {};
        var sectionID = sectionDOM.attr('id');
        var _self = this;
        var lineChart = sectionDOM.find('.line-chart-wrapper');
        var tableData, fixedTableData = {
            tableCols: [
                {
                    name: '-',
                    width: '5%'
                },
                {
                    name: 'Metric',
                    width: '35%'
                },
                {
                    name: 'Location',
                    width: '20%'
                },
                {
                    name: 'Script',
                    width: '20%'
                },
                {
                    name: 'Emulation',
                    width: '20%'
                }
            ],
            tableRowsData: []
        };
        if (lineChart) {
            returnData['images'] = [{
                    url: _self.tmp + '/media/section_' + sectionID + '.png'
                }];
            // read table data
            tableData = _self.readTableSection.apply(_self, [sectionDOM.find('.legend-container-bottom')]);
            //console.log(tableData);
            // fix data
            tableData.tableRowsData.forEach(function (row) {
                // remove set visible col
                row.splice(0, 1);
                // remove optional transaction name
                row.splice(2, 1);
                // remove optional error id
                row.splice(5, 1);
                // remove value
                row.splice(5, 1);
                row[0] = { color: '2A925B', dashed: false };
                fixedTableData.tableRowsData.push(row);
            });
            returnData['tableCols'] = fixedTableData.tableCols;
            returnData['tableRowsData'] = fixedTableData.tableRowsData;
        }
        else {
            // TODO handle table widget
            returnData['type'] = 'table';
        }
        return returnData;
    };
    Crawler.prototype.readDistributionSection = function (sectionDOM) {
        var _self = this;
        var returnData = {};
        returnData['sites'] = [];
        var sites = sectionDOM.find('.crawler-dist-site');
        sites.each(function (k, siteDOM) {
            var site = {};
            var $ = cheerio.load(siteDOM);
            // headline
            var headline = Crawler.makeTextPlain($(siteDOM).find('.crawler-dist-site-header').text());
            var sub_headline = Crawler.makeTextPlain($(siteDOM).find('.crawler-dist-site-subHeader').text());
            if (sub_headline) {
                headline += ' ' + sub_headline;
            }
            site['headline'] = headline;
            // table
            var table = _self.readTableSection($(siteDOM));
            _.assign(site, table);
            returnData['sites'].push(site);
        });
        returnData['images'] = [{
                url: _self.tmp + '/media/image_distGraph.png'
            }];
        return returnData;
    };
    Crawler.prototype.getSectionTypeFromClass = function (classStr) {
        var sectionType = null, ex = classStr.split(' '), ex2 = [];
        ex.forEach(function (className) {
            if (className.indexOf('crawler-section-type') > -1) {
                ex2 = className.split('_');
                if (ex2[1]) {
                    sectionType = ex2[1];
                }
            }
        });
        return sectionType;
    };
    Crawler.prototype.readSectionDOM = function (type, sectionDOM) {
        var _self = this;
        if (this.sectionTypeReaderMap[type]) {
            return this.sectionTypeReaderMap[type].apply(_self, [sectionDOM]);
        }
        else {
            return null;
        }
    };
    Crawler.prototype.analyzeDOM = function (localFileUrl) {
        var _self = this;
        var $ = cheerio.load(fs.readFileSync(localFileUrl, 'utf8'));
        // get all sections:
        var sectionsDOM = $('.crawler-section').not('.crawler-section-not-visible');
        var sections = [];
        var sectionType, data, ex = [], ex2 = [], sectionDOM, sectionJsonData;
        // create cover:
        sections.push({
            type: 'cover',
            testName: Crawler.makeTextPlain($('.crawler-testName').text()),
            status: Crawler.makeTextPlain($('.crawler-testStatus').text())
        });
        sectionsDOM.each(function (key, sectionData) {
            // detect section type
            sectionType = _self.getSectionTypeFromClass(sectionData.attribs.class);
            if (sectionType) {
                sectionDOM = $('#' + sectionData.attribs.id);
                data = {
                    type: sectionType,
                    name: Crawler.makeTextPlain(sectionDOM.find('.crawler-sectionName').text()),
                    description: Crawler.makeTextPlain(sectionDOM.find('.crawler-sectionDescription').text())
                };
                sectionJsonData = _self.readSectionDOM(sectionType, sectionDOM);
                _.assign(data, sectionJsonData);
                if (sectionJsonData) {
                    sections.push(data);
                }
            }
        });
        return sections;
    };
    Crawler.prototype.run = function () {
        var deferred = Q.defer();
        var _self = this;
        //console.log(_self.url + ' ' + _self.tmp);
        var childArgs = [
            path.join(__dirname, 'render.js'),
            _self.url,
            _self.tmp
        ];
        var ps = childProcess.execFile(binPath, childArgs, function (err, stdout, stderr) {
            console.log(stderr);
            console.log(stdout);
        });
        ps.on('exit', function (c, d) {
            _self.events.emit('done');
            deferred.resolve();
        });
        ps.stdout.on('data', function (std) {
            _self.events.emit('stdout', std);
        });
        ps.stderr.on('data', function (std) {
            _self.events.emit('stderr', std);
        });
        return deferred.promise;
    };
    return Crawler;
}());
exports.Crawler = Crawler;
//# sourceMappingURL=index.js.map