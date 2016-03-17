'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var section_1 = require("../section");
var emptyRow_factory_1 = require("../general-factories/emptyRow-factory");
var h2_factory_1 = require("../general-factories/h2-factory");
var table_factory_1 = require("../table/factories/table-factory");
var SectionGroupedTable = (function (_super) {
    __extends(SectionGroupedTable, _super);
    function SectionGroupedTable(data) {
        var _self = this;
        var groupsCounter = 0;
        _super.call(this, data);
        data['tableRowsData'].forEach(function (groupData) {
            var key;
            if (groupsCounter > 0) {
                var emptyRowObj = new emptyRow_factory_1.EmptyRowFactory().generate();
                key = Object.keys(emptyRowObj)[0];
                _self.body[key] = emptyRowObj[key];
            }
            var h2Obj = new h2_factory_1.H2Factory(groupData['name']).generate();
            key = Object.keys(h2Obj)[0];
            _self._body[key] = h2Obj[key];
            var tableObj = new table_factory_1.TableFactory(data['tableCols'], groupData['data']).generate();
            key = Object.keys(tableObj)[0];
            _self._body[key] = tableObj[key];
            groupsCounter++;
        });
    }
    return SectionGroupedTable;
})(section_1.Section);
exports.SectionGroupedTable = SectionGroupedTable;
//# sourceMappingURL=index.js.map