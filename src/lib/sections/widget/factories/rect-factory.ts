'use strict';
declare var require:any;
var _ = require('lodash');
import {Config} from "../../../config";
import {Section} from "../../section";

export class RectFactory {
    private color:string;
    private dashed:boolean;

    constructor(color:string, dashed:boolean) {
        this.color = color;
        this.dashed = dashed;
    }

    public generate():Object {
        var _self = this;
        var etag = 'w:p' + Section.getUniqueElementTag();
        var id1 = '006470C8';
        var name = 'Rectangle 1';

        var fillValue = {};
        var lineValue = {
            'a:solidFill': {
                'a:srgbClr': {
                    '$': {
                        'val': _self.color
                    }
                }
            }
        };


        var spPrNodeValue = {
            'a:xfrm': {
                'a:off': {
                    '$': {
                        'x': '0',
                        'y': '0'
                    }
                },
                'a:ext': {
                    '$': {
                        'cx': '140677',
                        'cy': '134718'
                    }
                }
            },
            'a:prstGeom': {
                '$': {
                    'prst': 'rect'
                },
                'a:avLst': ''
            }
        };

        if (this.dashed) {
            spPrNodeValue['a:noFill'] = '';
            lineValue['a:prstDash'] = {
                '$': {
                    'val': 'sysDot'
                }
            };
            spPrNodeValue['a:ln'] = lineValue;
        } else {
            spPrNodeValue['a:solidFill'] = {
                'a:srgbClr': {
                    '$': {
                        'val': _self.color
                    }
                }
            };
            spPrNodeValue['a:ln'] = lineValue;
        }

        var ret = {};

        ret[etag] = {
            '$': {
                'w:stormElementType': 'rect',
                'w:rsidR': id1,
                'w:rsidRDefault': id1
            },
            'w:r': {
                'w:rPr': {
                    'w:noProof': ''
                },
                'mc:AlternateContent': {
                    'mc:Choice': {
                        '$': {
                            'Requires': 'wps'
                        },
                        'w:drawing': {
                            'wp:inline': {
                                '$': {
                                    'distT': '0',
                                    'distB': '0',
                                    'distL': '0',
                                    'distR': '0'
                                },
                                'wp:extent': {
                                    '$': {
                                        'cx': '140677',
                                        'cy': '134718'
                                    }
                                },
                                'wp:effectExtent': {
                                    '$': {
                                        'l': '0',
                                        't': '0',
                                        'r': '12065',
                                        'b': '17780'
                                    }
                                },
                                'wp:docPr': {
                                    '$': {
                                        'id': '1', // TODO  what this id means
                                        'name': name
                                    }
                                },
                                'wp:cNvGraphicFramePr': '',
                                'a:graphic': {
                                    '$': {
                                        'xmlns:a': 'http://schemas.openxmlformats.org/drawingml/2006/main'
                                    },
                                    'a:graphicData': {
                                        '$': {
                                            'uri': 'http://schemas.microsoft.com/office/word/2010/wordprocessingShape'
                                        },
                                        'wps:wsp': {
                                            'wps:cNvSpPr': '',
                                            'wps:spPr': spPrNodeValue,
                                            'wps:style': {
                                                'a:lnRef': {
                                                    '$': {
                                                        'idx': '2'
                                                    },
                                                    'a:schemeClr': {
                                                        '$': {
                                                            'val': 'accent1'
                                                        },
                                                        'a:shade': {
                                                            '$': {
                                                                'val': '50000'
                                                            }
                                                        }
                                                    }
                                                },
                                                'a:fillRef': {
                                                    '$': {
                                                        'idx': '1'
                                                    },
                                                    'a:schemeClr': {
                                                        '$': {
                                                            'val': 'accent1'
                                                        }
                                                    }
                                                },
                                                'a:effectRef': {
                                                    '$': {
                                                        'idx': '0'
                                                    },
                                                    'a:schemeClr': {
                                                        '$': {
                                                            'val': 'accent1'
                                                        }
                                                    }
                                                },
                                                'a:fontRef': {
                                                    '$': {
                                                        'idx': 'minor'
                                                    },
                                                    'a:schemeClr': {
                                                        '$': {
                                                            'val': 'lt1'
                                                        }
                                                    }
                                                }
                                            },
                                            'wps:bodyPr': {
                                                '$': {
                                                    'rot': '0',
                                                    'spcFirstLastPara': '0',
                                                    'vertOverflow': 'overflow',
                                                    'horzOverflow': 'overflow',
                                                    'vert': 'horz',
                                                    'wrap': 'square',
                                                    'lIns': '91440',
                                                    'tIns': '45720',
                                                    'rIns': '91440',
                                                    'bIns': '45720',
                                                    'numCol': '1',
                                                    'spcCol': '0',
                                                    'rtlCol': '0',
                                                    'fromWordArt': '0',
                                                    'anchor': 'ctr',
                                                    'anchorCtr': '0',
                                                    'forceAA': '0',
                                                    'compatLnSpc': '1'
                                                },
                                                'a:prstTxWarp': {
                                                    '$': {
                                                        'prst': 'textNoShape'
                                                    },
                                                    'a:avLst': ''
                                                },
                                                'a:noAutofit': ''
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        return ret;
    }
}