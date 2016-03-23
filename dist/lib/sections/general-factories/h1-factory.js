'use strict';
var config_1 = require("../../config");
var section_1 = require("../section");
var H1Factory = (function () {
    function H1Factory(content) {
        this.content = content;
    }
    H1Factory.prototype.generate = function () {
        var etag = 'w:p' + section_1.Section.getUniqueElementTag();
        var id1 = '003F4390';
        var id2 = '00BC6223';
        var index = 0;
        var linkName = '_Toc444177275';
        var ret = {};
        ret[etag] = {
            '$': {
                'w:stormElementType': 'h1',
                'w:rsidR': id1,
                'w:rsidRPr': id2,
                'w:rsidRDefault': id1,
                'w:rsidP': id1
            },
            'w:pPr': {
                'w:pStyle': {
                    '$': {
                        'w:val': 'Heading1'
                    }
                },
                'w:rPr': {
                    'w:rFonts': {
                        '$': {
                            'w:ascii': config_1.Config.DEFAULT_FONT,
                            'w:hAnsi': config_1.Config.DEFAULT_FONT
                        }
                    }
                }
            },
            'w:bookmarkStart': {
                '$': {
                    'w:id': index,
                    'w:name': linkName
                }
            },
            'w:r': {
                '$': {
                    'w:rsidRPr': id2
                },
                'w:rPr': {
                    'w:rFonts': {
                        '$': {
                            'w:ascii': config_1.Config.DEFAULT_FONT,
                            'w:hAnsi': config_1.Config.DEFAULT_FONT
                        }
                    }
                },
                'w:t': this.content.charAt(0).toUpperCase() + this.content.slice(1)
            },
            'w:bookmarkEnd': {
                '$': {
                    'w:id': index
                }
            }
        };
        return ret;
    };
    return H1Factory;
}());
exports.H1Factory = H1Factory;
//# sourceMappingURL=h1-factory.js.map