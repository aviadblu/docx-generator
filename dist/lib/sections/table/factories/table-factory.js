'use strict';
var _ = require('lodash');
var config_1 = require("../../../config");
var section_1 = require("../../section");
var TableFactory = (function () {
    function TableFactory(tableCols, tableRowsData) {
        this.id1 = 'A17773';
        this.tableCols = tableCols;
        this.tableRowsData = tableRowsData;
    }
    TableFactory.prototype.createRow = function (colsData, rowData, header) {
        header = typeof header !== 'undefined' ? header : false;
        var _self = this;
        var etag = 'w:tr' + section_1.Section.getUniqueElementTag();
        var ret = {};
        ret[etag] = {
            '$': {
                'w:stormElementType': 'table',
                'w:rsidR': this.id1,
                'w:rsidRPr': this.id1,
                'w:rsidTr': this.id1
            },
            'w:trPr': {
                'w:cnfStyle': {
                    '$': {
                        'w:val': '100000000000',
                        'w:firstRow': header ? '1' : '0',
                        'w:lastRow': '0',
                        'w:firstColumn': '0',
                        'w:lastColumn': '0',
                        'w:oddVBand': '0',
                        'w:evenVBand': '0',
                        'w:oddHBand': '0',
                        'w:evenHBand': '0',
                        'w:firstRowFirstColumn': '0',
                        'w:firstRowLastColumn': '0',
                        'w:lastRowFirstColumn': '0',
                        'w:lastRowLastColumn': '0'
                    }
                }
            }
        };
        var cellIndex = 0;
        rowData.forEach(function (cellData) {
            if (colsData[cellIndex]) {
                var cell = {};
                var cellEtag = 'w:tc' + section_1.Section.getUniqueElementTag();
                cell[cellEtag] = {
                    'w:tcPr': {
                        'w:cnfStyle': {
                            '$': {
                                'w:val': '001000000000',
                                'w:firstRow': '0',
                                'w:lastRow': '0',
                                'w:firstColumn': '0',
                                'w:lastColumn': '0',
                                'w:oddVBand': '0',
                                'w:evenVBand': '0',
                                'w:oddHBand': '0',
                                'w:evenHBand': '0',
                                'w:firstRowFirstColumn': '0',
                                'w:firstRowLastColumn': '0',
                                'w:lastRowFirstColumn': '0',
                                'w:lastRowLastColumn': '0'
                            }
                        },
                        'w:tcW': {
                            '$': {
                                'w:w': colsData[cellIndex],
                                'w:type': 'dxa'
                            }
                        }
                    },
                    'w:p': {
                        '$': {
                            'w:rsidR': _self.id1,
                            'w:rsidRPr': _self.id1,
                            'w:rsidRDefault': _self.id1,
                            'w:rsidP': _self.id1
                        },
                        'w:pPr': {
                            'w:rPr': {
                                'w:rFonts': {
                                    '$': {
                                        'w:ascii': config_1.Config.DEFAULT_FONT,
                                        'w:hAnsi': config_1.Config.DEFAULT_FONT
                                    }
                                }
                            }
                        },
                        'w:r': {
                            '$': {
                                'w:rsidRPr': _self.id1
                            },
                            'w:rPr': {
                                'w:rFonts': {
                                    '$': {
                                        'w:ascii': config_1.Config.DEFAULT_FONT,
                                        'w:hAnsi': config_1.Config.DEFAULT_FONT
                                    }
                                }
                            },
                            'w:t': cellData
                        }
                    }
                };
                _.assign(ret[etag], cell);
                cellIndex++;
            }
        });
        return ret;
    };
    TableFactory.prototype.generate = function () {
        var _self = this;
        var etag = 'w:tbl' + section_1.Section.getUniqueElementTag();
        var ret = {};
        var firstRow = [], colIndex = 0, askedWidth, colsData = [], gridCols = {}, defColWidth = Math.floor(config_1.Config.DOCUMENT_WIDTH / this.tableCols.length), widthLeftToUse = config_1.Config.DOCUMENT_WIDTH;
        this.tableCols.forEach(function (colData) {
            // insert first row to data
            if (colData['name']) {
                firstRow[colIndex] = colData['name'];
            }
            if (!colData['width']) {
                askedWidth = defColWidth;
            }
            else if (colData['width'].indexOf('%') > -1) {
                askedWidth = parseInt(colData['width'].split('%')[0]) / 100 * config_1.Config.DOCUMENT_WIDTH;
            }
            else {
                askedWidth = parseInt(colData['width'].split('px')[0]);
            }
            if (askedWidth <= widthLeftToUse) {
                colsData[colIndex] = askedWidth;
            }
            else {
                colsData[colIndex] = widthLeftToUse;
            }
            gridCols['w:gridCol' + section_1.Section.getUniqueElementTag()] = {
                '$': {
                    'w:w': colsData[colIndex]
                }
            };
            widthLeftToUse -= colsData[colIndex];
            colIndex++;
        });
        var rowIndex = 0;
        var rowsData = [];
        if (firstRow.length > 0) {
            rowsData[rowIndex] = _self.createRow(colsData, firstRow, true);
            rowIndex++;
        }
        this.tableRowsData.forEach(function (rowData) {
            //console.log('---------------------------------');
            //console.log(colsData);
            rowsData[rowIndex] = _self.createRow(colsData, rowData);
            rowIndex++;
        });
        ret[etag] = {
            'w:tblPr': {
                'w:tblStyle': {
                    '$': {
                        'w:val': config_1.Config.GRID_STYLE
                    }
                },
                'w:tblW': {
                    '$': {
                        'w:w': '0',
                        'w:type': 'auto'
                    }
                },
                'w:tblLook': {
                    '$': {
                        'w:val': '04A0',
                        'w:firstRow': '0',
                        'w:lastRow': '0',
                        'w:firstColumn': '0',
                        'w:lastColumn': '0',
                        'w:noHBand': '0',
                        'w:noVBand': '1'
                    }
                }
            },
            'w:tblGrid': gridCols
        };
        rowsData.forEach(function (row) {
            _.assign(ret[etag], row);
        });
        return ret;
    };
    return TableFactory;
}());
exports.TableFactory = TableFactory;
//# sourceMappingURL=table-factory.js.map