'use strict';
declare var require:any;
declare var exports:any;

import {Crawler} from "./crawler/index";
import {Docx} from "./lib/docx";

exports = module.exports = {
    Crawler: Crawler,
    Docx: Docx
};