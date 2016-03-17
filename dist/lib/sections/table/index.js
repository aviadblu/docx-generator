'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var section_1 = require("../section");
var table_factory_1 = require("./factories/table-factory");
var SectionTable = (function (_super) {
    __extends(SectionTable, _super);
    function SectionTable(data) {
        _super.call(this, data);
        this._body = new table_factory_1.TableFactory(data.tableCols, data.tableRowsData).generate();
    }
    return SectionTable;
})(section_1.Section);
exports.SectionTable = SectionTable;
//# sourceMappingURL=index.js.map