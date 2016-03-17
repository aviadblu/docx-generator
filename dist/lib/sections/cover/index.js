'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var section_1 = require("../section");
var emptyRow_factory_1 = require("../general-factories/emptyRow-factory");
var pageBreak_factory_1 = require("../general-factories/pageBreak-factory");
var logo_factory_1 = require("./factories/logo-factory");
var testName_factory_1 = require("./factories/testName-factory");
var testStatus_factory_1 = require("./factories/testStatus-factory");
var SectionCover = (function (_super) {
    __extends(SectionCover, _super);
    function SectionCover(data) {
        _super.call(this, data);
        // 6 empty rows spacers:
        for (var i = 0; i < 6; i++) {
            var emptyRowObj = new emptyRow_factory_1.EmptyRowFactory().generate();
            var emptyRowKey = Object.keys(emptyRowObj)[0];
            this.body[emptyRowKey] = emptyRowObj[emptyRowKey];
        }
        // logo
        var logoObj = new logo_factory_1.LogoFactory().generate();
        var logoKey = Object.keys(logoObj)[0];
        this.body[logoKey] = logoObj[logoKey];
        // test name
        var testNameObj = new testName_factory_1.TestNameFactory(data['testName']).generate();
        var testNameKey = Object.keys(testNameObj)[0];
        this.body[testNameKey] = testNameObj[testNameKey];
        // test status
        var testStatusObj = new testStatus_factory_1.TestStatusFactory(data['status']).generate();
        var testStatusKey = Object.keys(testStatusObj)[0];
        this.body[testStatusKey] = testStatusObj[testStatusKey];
        // page break
        var pageBreakObj = new pageBreak_factory_1.PageBreakFactory().generate();
        var pageBreakKey = Object.keys(pageBreakObj)[0];
        this.body[pageBreakKey] = pageBreakObj[pageBreakKey];
    }
    return SectionCover;
})(section_1.Section);
exports.SectionCover = SectionCover;
//# sourceMappingURL=index.js.map