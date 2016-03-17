'use strict';
var config_1 = require("../../../config");
var section_1 = require("../../section");
var TestStatusFactory = (function () {
    function TestStatusFactory(testStatus) {
        this.testStatus = testStatus;
    }
    TestStatusFactory.prototype.generate = function () {
        var etag = 'w:p' + section_1.Section.getUniqueElementTag();
        var id1 = '003F4390';
        var id2 = '008134A7';
        var id3 = '000362D6';
        var colorMap = {
            'Failed': 'FF0000',
            'Passed': '01A982'
        };
        var color = colorMap[this.testStatus] ? colorMap[this.testStatus] : '000000';
        var ret = {};
        ret[etag] = {
            '$': {
                'w:stormElementType': 'testStatus',
                'w:rsidR': id1,
                'w:rsidRPr': id3,
                'w:rsidRDefault': id1,
                'w:rsidP': id1
            },
            'w:pPr': {
                'w:jc': {
                    '$': {
                        'w:val': 'center'
                    }
                },
                'w:rPr': {
                    'w:rFonts': {
                        '$': {
                            'w:ascii': config_1.Config.DEFAULT_FONT,
                            'w:hAnsi': config_1.Config.DEFAULT_FONT
                        }
                    },
                    'w:color': {
                        '$': {
                            'w:val': color
                        }
                    },
                    'w:sz': {
                        '$': {
                            'w:val': '40'
                        }
                    },
                    'w:szCs': {
                        '$': {
                            'w:val': '40'
                        }
                    }
                }
            },
            'w:r': {
                '$': {
                    'w:rsidRPr': id3
                },
                'w:rPr': {
                    'w:rFonts': {
                        '$': {
                            'w:ascii': config_1.Config.DEFAULT_FONT,
                            'w:hAnsi': config_1.Config.DEFAULT_FONT
                        }
                    },
                    'w:color': {
                        '$': {
                            'w:val': color
                        }
                    },
                    'w:sz': {
                        '$': {
                            'w:val': '40'
                        }
                    },
                    'w:szCs': {
                        '$': {
                            'w:val': '40'
                        }
                    }
                },
                'w:t': this.testStatus
            }
        };
        return ret;
    };
    return TestStatusFactory;
})();
exports.TestStatusFactory = TestStatusFactory;
//# sourceMappingURL=testStatus-factory.js.map