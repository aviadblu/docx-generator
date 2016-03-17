'use strict';

import {Config} from "../../config";
import {Section} from "../section";

export class PageBreakFactory {

    public generate():Object {
        var etag = 'w:p' + Section.getUniqueElementTag();

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
    }
}