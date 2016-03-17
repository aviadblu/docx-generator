'use strict';

import {Config} from "../../config";
import {Section} from "../section";

export class EmptyRowFactory {
    public generate():Object {
        var etag = 'w:p' + Section.getUniqueElementTag();

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
                            'w:ascii': Config.DEFAULT_FONT,
                            'w:hAnsi': Config.DEFAULT_FONT
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
    }
}