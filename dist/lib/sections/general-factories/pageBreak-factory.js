'use strict';
var section_1 = require("../section");
var PageBreakFactory = (function () {
    function PageBreakFactory() {
    }
    PageBreakFactory.prototype.generate = function () {
        var etag = 'w:p' + section_1.Section.getUniqueElementTag();
        var ret = {};
        ret[etag] = {
            '$': {
                'w:stormElementType': 'pageBreak',
                'w:rsidR': '00B50BD8',
                'w:rsidRDefault': '00B50BD8'
            },
            'w:r': {
                'w:br': {
                    '$': {
                        'w:type': 'page'
                    }
                }
            }
        };
        return ret;
    };
    return PageBreakFactory;
}());
exports.PageBreakFactory = PageBreakFactory;
//# sourceMappingURL=pageBreak-factory.js.map