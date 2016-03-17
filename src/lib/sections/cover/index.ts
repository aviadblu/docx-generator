'use strict';
declare var require:any;
declare var __dirname:any;
declare var module:any;

import {Section} from "../section";
import {ISectionData} from '../section-interface';
import {EmptyRowFactory} from "../general-factories/emptyRow-factory";
import {PageBreakFactory} from "../general-factories/pageBreak-factory";
import {LogoFactory} from "./factories/logo-factory";
import {TestNameFactory} from "./factories/testName-factory";
import {TestStatusFactory} from "./factories/testStatus-factory";

export class SectionCover extends Section {
    constructor(data:ISectionData) {
        super(data);
        // 6 empty rows spacers:
        for (let i = 0; i < 6; i++) {
            var emptyRowObj = new EmptyRowFactory().generate();
            var emptyRowKey = Object.keys(emptyRowObj)[0];
            this.body[emptyRowKey] = emptyRowObj[emptyRowKey];
        }
        // logo
        var logoObj = new LogoFactory().generate();
        var logoKey = Object.keys(logoObj)[0];
        this.body[logoKey] = logoObj[logoKey];
        // test name
        var testNameObj = new TestNameFactory(data['testName']).generate();
        var testNameKey = Object.keys(testNameObj)[0];
        this.body[testNameKey] = testNameObj[testNameKey];
        // test status
        var testStatusObj = new TestStatusFactory(data['status']).generate();
        var testStatusKey = Object.keys(testStatusObj)[0];
        this.body[testStatusKey] = testStatusObj[testStatusKey];
        // page break
        var pageBreakObj = new PageBreakFactory().generate();
        var pageBreakKey = Object.keys(pageBreakObj)[0];
        this.body[pageBreakKey] = pageBreakObj[pageBreakKey];
    }
}