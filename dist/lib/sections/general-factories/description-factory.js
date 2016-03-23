'use strict';
var config_1 = require("../../config");
var section_1 = require("../section");
var DescriptionFactory = (function () {
    function DescriptionFactory(content) {
        this.content = content;
    }
    DescriptionFactory.prototype.generate = function () {
        var etag = 'w:p' + section_1.Section.getUniqueElementTag();
        var id1 = '003F4390';
        var id2 = '00BC6223';
        var ret = {};
        ret[etag] = {
            '$': {
                'w:stormElementType': 'description',
                'w:rsidR': id1,
                'w:rsidRPr': id2,
                'w:rsidRDefault': id1,
                'w:rsidP': id1
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
                'w:t': this.content
            }
        };
        return ret;
    };
    return DescriptionFactory;
}());
exports.DescriptionFactory = DescriptionFactory;
//# sourceMappingURL=description-factory.js.map