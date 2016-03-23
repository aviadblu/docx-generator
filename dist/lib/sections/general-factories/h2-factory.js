'use strict';
var config_1 = require("../../config");
var section_1 = require("../section");
var H2Factory = (function () {
    function H2Factory(content) {
        this.content = content;
    }
    H2Factory.prototype.generate = function () {
        var etag = 'w:p' + section_1.Section.getUniqueElementTag();
        var id1 = '00E435C0';
        var id2 = '000362D6';
        var index = 0;
        var linkName = '_Toc444177275';
        var ret = {};
        ret[etag] = {
            '$': {
                'w:stormElementType': 'h2',
                'w:rsidR': id1,
                'w:rsidRPr': id2,
                'w:rsidRDefault': id1,
                'w:rsidP': id1
            },
            'w:pPr': {
                'w:spacing': {
                    '$': {
                        'w:lineRule': 'auto',
                        'w:line': '240',
                        'w:after': '100'
                    }
                },
                'w:rPr': {
                    'w:rFonts': {
                        '$': {
                            'w:hAnsi': config_1.Config.DEFAULT_FONT,
                            'w:ascii': config_1.Config.DEFAULT_FONT
                        }
                    },
                    'w:b': '',
                    'w:bCs': '',
                    'w:u': {
                        '$': {
                            'w:val': 'single'
                        }
                    }
                }
            },
            'w:r': {
                '$': {
                    'w:rsidRPr': id2
                },
                'w:rPr': {
                    'w:rFonts': {
                        '$': {
                            'w:hAnsi': config_1.Config.DEFAULT_FONT,
                            'w:ascii': config_1.Config.DEFAULT_FONT
                        }
                    },
                    'w:b': '',
                    'w:bCs': '',
                    'w:u': {
                        '$': {
                            'w:val': 'single'
                        }
                    }
                },
                'w:t': this.content
            }
        };
        return ret;
    };
    return H2Factory;
}());
exports.H2Factory = H2Factory;
//# sourceMappingURL=h2-factory.js.map