'use strict';

import {Config} from "../../config";
import {Section} from "../section";

export class DescriptionFactory {
    private content:string;
    private sectionIndex:number;

    constructor(content:string) {
        this.content = content;
    }

    public generate():Object {
        var etag = 'w:p' + Section.getUniqueElementTag();
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
                            'w:ascii': Config.DEFAULT_FONT,
                            'w:hAnsi': Config.DEFAULT_FONT
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
                            'w:ascii': Config.DEFAULT_FONT,
                            'w:hAnsi': Config.DEFAULT_FONT
                        }
                    }
                },
                'w:t': this.content
            }
        };
        return ret;
    }
}