'use strict';
declare var require:any;
var _ = require('lodash');
import {Config} from "../../../config";
import {Section} from "../../section";
import {ISectionImage} from "./image-interface";

export class ImageFactory {
    private image:ISectionImage;

    constructor(image:ISectionImage) {
        this.image = image;
    }

    public generate():Object {
        var etag = 'w:p' + Section.getUniqueElementTag();
        var id1 = '008134A7';
        var id2 = '00966436';
        var id3 = '000362D6';
        var anchorId = '1B496E76';
        var editId = '6B1F5AAA';
        var imageName = '';
        var imageDesc = '';
        var ret = {};

        ret[etag] = {
            '$': {
                'w:stormElementType': 'image',
                'w:rsidR': id1,
                'w:rsidRDefault': id2
            },
            'w:bookmarkStart': {
                '$': {
                    'w:id': '0',
                    'w:name': '_GoBack'
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
                    'w:noProof': ''
                },
                'w:drawing': {
                    'wp:inline': {
                        '$': {
                            'distT': '0',
                            'distB': '0',
                            'distL': '0',
                            'distR': '0',
                            'wp14:anchorId': anchorId,
                            'wp14:editId': editId
                        },
                        'wp:extent': {
                            '$': {
                                'cx': '6851015',
                                'cy': '2493645'
                            }
                        },
                        'wp:effectExtent': {
                            '$': {
                                'l': '0',
                                't': '0',
                                'r': '6985',
                                'b': '1905'
                            }
                        },
                        'wp:docPr': {
                            '$': {
                                'id': '2', // TODO check id meaning
                                'name': imageName,
                                'descr': imageDesc
                            }
                        },
                        'wp:cNvGraphicFramePr': {
                            'a:graphicFrameLocks': {
                                '$': {
                                    'xmlns:a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
                                    'noChangeAspect': '1'
                                }
                            }
                        },
                        'a:graphic': {
                            '$': {
                                'xmlns:a': 'http://schemas.openxmlformats.org/drawingml/2006/main'
                            },
                            'a:graphicData': {
                                '$': {
                                    'uri': 'http://schemas.openxmlformats.org/drawingml/2006/picture'
                                },
                                'pic:pic': {
                                    '$': {
                                        'xmlns:pic': 'http://schemas.openxmlformats.org/drawingml/2006/picture'
                                    },
                                    'pic:nvPicPr': {
                                        'pic:cNvPr': {
                                            '$': {
                                                'id': '0', // TODO check id meaning
                                                'name': imageName,
                                                'descr': imageDesc
                                            }
                                        },
                                        'pic:cNvPicPr': {
                                            'a:picLocks': {
                                                '$': {
                                                    'noChangeAspect': '1',
                                                    'noChangeArrowheads': '1'
                                                }
                                            }
                                        }
                                    },
                                    'pic:blipFill': {
                                        'a:blip': {
                                            '$': {
                                                'r:embed': this.image.id
                                            },
                                            'a:extLst': {
                                                'a:ext': {
                                                    '$': {
                                                        'uri': '{28A0092B-C50C-407E-A947-70E740481C1C}'
                                                    },
                                                    'a14:useLocalDpi': {
                                                        '$': {
                                                            'xmlns:a14': 'http://schemas.microsoft.com/office/drawing/2010/main',
                                                            'val': '0'
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        'a:srcRect': '',
                                        'a:stretch': {
                                            'a:fillRect': ''
                                        }
                                    },
                                    'pic:spPr': {
                                        '$': {
                                            'bwMode': 'auto'
                                        },
                                        'a:xfrm': {
                                            'a:off': {
                                                '$': {
                                                    'x': '0',
                                                    'y': '0'
                                                }
                                            },
                                            'a:ext': {
                                                '$': {
                                                    'cx': '6851015',
                                                    'cy': '2493645'
                                                }
                                            }
                                        },
                                        'a:prstGeom': {
                                            '$': {
                                                'prst': 'rect'
                                            },
                                            'a:avLst': ''
                                        },
                                        'a:noFill': '',
                                        'a:ln': {
                                            'a:noFill': ''
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            'w:bookmarkEnd': {
                '$': {
                    'w:id': '0'
                }
            }
        };
        return ret;
    }
}