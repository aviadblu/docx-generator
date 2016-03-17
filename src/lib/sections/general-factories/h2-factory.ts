'use strict';

import {Config} from "../../config";
import {Section} from "../section";

export class H2Factory {
    private content:string;

    constructor(content:string) {
        this.content = content;
    }

    public generate():Object {
        var etag = 'w:p' + Section.getUniqueElementTag();
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
                            'w:hAnsi': Config.DEFAULT_FONT,
                            'w:ascii': Config.DEFAULT_FONT
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
                            'w:hAnsi': Config.DEFAULT_FONT,
                            'w:ascii': Config.DEFAULT_FONT
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
    }
}