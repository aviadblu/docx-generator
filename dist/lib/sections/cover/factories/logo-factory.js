'use strict';
var config_1 = require("../../../config");
var section_1 = require("../../section");
var LogoFactory = (function () {
    function LogoFactory() {
    }
    LogoFactory.prototype.generate = function () {
        var etag = 'w:p' + section_1.Section.getUniqueElementTag();
        var id1 = '003F4390';
        var id2 = '00BC6223';
        var id3 = '000362D6';
        var logoId = 'rId5';
        var logoName = 'Storm logo';
        var ret = {};
        ret[etag] = {
            '$': {
                'w:stormElementType': 'logo',
                'w:rsidR': id2,
                'w:rsidRPr': id3,
                'w:rsidRDefault': id2,
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
                            'w:ascii': config_1.Config.DEFAULT_FONT,
                            'w:hAnsi': config_1.Config.DEFAULT_FONT
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
                            'w:ascii': config_1.Config.DEFAULT_FONT,
                            'w:hAnsi': config_1.Config.DEFAULT_FONT
                        }
                    },
                    'w:noProof': '',
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
                                'cx': '912396',
                                'cy': '1386840'
                            }
                        },
                        'wp:effectExtent': {
                            '$': {
                                'l': '0',
                                't': '0',
                                'r': '2540',
                                'b': '3810'
                            }
                        },
                        // skipped
                        'wp:docPr': {
                            '$': {
                                'id': '1',
                                'name': logoName,
                                'descr': ''
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
                                        // skipped
                                        'pic:cNvPr': {
                                            '$': {
                                                'id': '0',
                                                'name': logoName,
                                                'descr': ''
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
                                                'r:embed': logoId
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
                                                    'cx': '923502',
                                                    'cy': '1403720'
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
            }
        };
        return ret;
    };
    return LogoFactory;
}());
exports.LogoFactory = LogoFactory;
//# sourceMappingURL=logo-factory.js.map