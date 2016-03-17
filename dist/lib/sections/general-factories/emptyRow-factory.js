'use strict';
var config_1 = require("../../config");
var section_1 = require("../section");
var EmptyRowFactory = (function () {
    function EmptyRowFactory() {
    }
    EmptyRowFactory.prototype.generate = function () {
        var etag = 'w:p' + section_1.Section.getUniqueElementTag();
        var ret = {};
        ret[etag] = {
            '$': {
                'w:stormElementType': 'emptyRow',
                'w:rsidR': '00BC6223',
                'w:rsidRPr': '00BC6223',
                'w:rsidRDefault': '00BC6223',
                'w:rsidP': '003F4390'
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
            }
        };
        return ret;
    };
    return EmptyRowFactory;
})();
exports.EmptyRowFactory = EmptyRowFactory;
//# sourceMappingURL=emptyRow-factory.js.map