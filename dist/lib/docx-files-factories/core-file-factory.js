'use strict';
var CoreFileFactory = (function () {
    function CoreFileFactory(title, subject) {
        this.title = title;
        this.subject = subject;
    }
    CoreFileFactory.prototype.generate = function () {
        var date = new Date().toISOString();
        return {
            'cp:coreProperties': {
                '$': {
                    'xmlns:cp': 'http://schemas.openxmlformats.org/package/2006/metadata/core-properties',
                    'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
                    'xmlns:dcterms': 'http://purl.org/dc/terms/',
                    'xmlns:dcmitype': 'http://purl.org/dc/dcmitype/',
                    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                'dc:title': this.title,
                'dc:subject': this.subject,
                'dc:creator': 'HPE StormRunner',
                'cp:keywords': 'keywords',
                'dc:description': 'description',
                'cp:lastModifiedBy': 'HPE StormRunner',
                'cp:revision': '1',
                'dcterms:created': {
                    '$': {
                        'xsi:type': 'dcterms:W3CDTF'
                    },
                    '_': date
                },
                'dcterms:modified': {
                    '$': {
                        'xsi:type': 'dcterms:W3CDTF'
                    },
                    '_': date
                }
            }
        };
    };
    return CoreFileFactory;
})();
exports.CoreFileFactory = CoreFileFactory;
//# sourceMappingURL=core-file-factory.js.map