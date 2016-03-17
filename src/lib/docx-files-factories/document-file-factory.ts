'use strict';

import Config = require('../config');

export class DocumentFileFactory {

    constructor() {
    }

    public generate():Object {
        return {
            'w:document': {
                '$': {
                    'mc:Ignorable': 'w14 w15 wp14',
                    'xmlns:wps': 'http://schemas.microsoft.com/office/word/2010/wordprocessingShape',
                    'xmlns:wne': 'http://schemas.microsoft.com/office/word/2006/wordml',
                    'xmlns:wpi': 'http://schemas.microsoft.com/office/word/2010/wordprocessingInk',
                    'xmlns:wpg': 'http://schemas.microsoft.com/office/word/2010/wordprocessingGroup',
                    'xmlns:w15': 'http://schemas.microsoft.com/office/word/2012/wordml',
                    'xmlns:w14': 'http://schemas.microsoft.com/office/word/2010/wordml',
                    'xmlns:w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
                    'xmlns:w10': 'urn:schemas-microsoft-com:office:word',
                    'xmlns:wp': 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing',
                    'xmlns:wp14': 'http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing',
                    'xmlns:v': 'urn:schemas-microsoft-com:vml',
                    'xmlns:m': 'http://schemas.openxmlformats.org/officeDocument/2006/math',
                    'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
                    'xmlns:o': 'urn:schemas-microsoft-com:office:office',
                    'xmlns:mc': 'http://schemas.openxmlformats.org/markup-compatibility/2006',
                    'xmlns:wpc': 'http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas'
                },
                'w:body': {
                    'sections:placeholder': '00',
                    'w:sectPr##1##': {
                        '$': {
                            'w:rsidSect': '005F386B',
                            'w:rsidR': '006C5BF3'
                        },
                        'w:pgSz': {
                            '$': {
                                'w:w': '12240',
                                'w:h': '15840'
                            }
                        },
                        'w:pgMar': {
                            '$': {
                                'w:gutter': '0',
                                'w:footer': '720',
                                'w:header': '720',
                                'w:left': '720',
                                'w:bottom': '720',
                                'w:right': '720',
                                'w:top': '720'
                            }
                        },
                        'w:cols': {
                            '$': {
                                'w:space': '720'
                            }
                        },
                        'w:docGrid': {
                            '$': {
                                'w:linePitch': '360'
                            }
                        }
                    }
                }
            }
        };
    }
}