'use strict';

import {Config} from "../../../config";
import {Section} from "../../section";

export class TestStatusFactory {
    private testStatus:string;

    constructor(testStatus:string) {
        this.testStatus = testStatus;
    }

    public generate():Object {
        var etag = 'w:p' + Section.getUniqueElementTag();
        var id1 = '003F4390';
        var id2 = '008134A7';
        var id3 = '000362D6';

        var colorMap = {
            'Failed': 'FF0000',
            'Passed': '01A982'
        };

        var color = colorMap[this.testStatus] ? colorMap[this.testStatus] : '000000';
        var ret = {};
        ret[etag] = {
            '$': {
                'w:stormElementType': 'testStatus',
                'w:rsidR': id1,
                'w:rsidRPr': id3,
                'w:rsidRDefault': id1,
                'w:rsidP': id1
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
                    'w:color': {
                        '$': {
                            'w:val': color
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
            },
            'w:r': {
                '$': {
                    'w:rsidRPr': id3
                },
                'w:rPr': {
                    'w:rFonts': {
                        '$': {
                            'w:ascii': Config.DEFAULT_FONT,
                            'w:hAnsi': Config.DEFAULT_FONT
                        }
                    },
                    'w:color': {
                        '$': {
                            'w:val': color
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
                },
                'w:t': this.testStatus
            }
        };
        return ret;
    }
}