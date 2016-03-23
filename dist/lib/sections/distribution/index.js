'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var section_1 = require("../section");
var image_factory_1 = require("../general-factories/image-factory");
var h2_factory_1 = require("../general-factories/h2-factory");
var table_factory_1 = require("../table/factories/table-factory");
var SectionDistribution = (function (_super) {
    __extends(SectionDistribution, _super);
    function SectionDistribution(data) {
        _super.call(this, data);
        var _self = this;
        data['sites'].forEach(function (site) {
            // create h2
            var h2 = new h2_factory_1.H2Factory(site['headline']).generate();
            key = Object.keys(h2)[0];
            _self._body[key] = h2[key];
            // TODO create table
            //console.log(site['tableRowsData']);
            var table = new table_factory_1.TableFactory(site['tableCols'], site['tableRowsData']).generate();
            key = Object.keys(table)[0];
            //console.log(table[key]);
            _self._body[key] = table[key];
        });
        var key;
        // set widget image [graph snapshot]
        var distGraphImage = new image_factory_1.ImageFactory(data['images'][0]).generate();
        key = Object.keys(distGraphImage)[0];
        this._body[key] = distGraphImage[key];
    }
    return SectionDistribution;
}(section_1.Section));
exports.SectionDistribution = SectionDistribution;
//# sourceMappingURL=index.js.map