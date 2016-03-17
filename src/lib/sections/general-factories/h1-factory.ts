'use strict';

import {Config} from "../../config";
import {Section} from "../section";

export class H1Factory {
    private content:string;

    constructor(content:string) {
        this.content = content;
    }

    public generate():Object {
        var etag = 'w:p' + Section.getUniqueElementTag();
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
                            'w:ascii': Config.DEFAULT_FONT,
                            'w:hAnsi': Config.DEFAULT_FONT
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
                            'w:ascii': Config.DEFAULT_FONT,
                            'w:hAnsi': Config.DEFAULT_FONT
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
    }
}