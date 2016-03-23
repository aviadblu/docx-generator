'use strict';
var _ = require('lodash');
var RelsDocumentFileFactory = (function () {
    function RelsDocumentFileFactory(imagesRelationships) {
        this.imagesRelationships = imagesRelationships;
    }
    RelsDocumentFileFactory.prototype.generate = function () {
        var Relationships = {
            'Relationships': {
                '$': {
                    'xmlns': 'http://schemas.openxmlformats.org/package/2006/relationships'
                },
                'Relationship##0##': {
                    '$': {
                        'Id': 'rId3',
                        'Type': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings',
                        'Target': 'settings.xml'
                    }
                },
                'Relationship##1##': {
                    '$': {
                        'Id': 'rId7',
                        'Type': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme',
                        'Target': 'theme/theme1.xml'
                    }
                },
                'Relationship##2##': {
                    '$': {
                        'Id': 'rId2',
                        'Type': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles',
                        'Target': 'styles.xml'
                    }
                },
                'Relationship##3##': {
                    '$': {
                        'Id': 'rId1',
                        'Type': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml',
                        'Target': '../customXml/item1.xml'
                    }
                },
                'Relationship##4##': {
                    '$': {
                        'Id': 'rId6',
                        'Type': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable',
                        'Target': 'fontTable.xml'
                    }
                },
                'Relationship##5##': {
                    '$': {
                        'Id': 'rId4',
                        'Type': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/webSettings',
                        'Target': 'webSettings.xml'
                    }
                },
                'Relationship##6##': {
                    '$': {
                        'Id': 'rId5',
                        'Type': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/image',
                        'Target': 'media/logo.jpeg'
                    }
                }
            }
        };
        var relationshipIndex = 7;
        var imageIndex = 0;
        this.imagesRelationships.forEach(function (imageData) {
            var key = 'Relationship##' + relationshipIndex + '##';
            Relationships['Relationships'][key] = {
                '$': {
                    'Id': 'image' + imageIndex,
                    'Type': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/image',
                    'Target': imageData['localUrl']
                }
            };
            relationshipIndex++;
            imageIndex++;
        });
        return Relationships;
    };
    return RelsDocumentFileFactory;
}());
exports.RelsDocumentFileFactory = RelsDocumentFileFactory;
//# sourceMappingURL=rels_document-file-factory.js.map