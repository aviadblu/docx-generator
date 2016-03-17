'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var section_1 = require("../section");
var image_factory_1 = require("./factories/image-factory");
var table_factory_1 = require("../table/factories/table-factory");
var xml2js = require('xml2js');
var XMLBuilder = new xml2js.Builder({ pretty: false });
var SectionWidget = (function (_super) {
    __extends(SectionWidget, _super);
    function SectionWidget(data) {
        var _self = this;
        _super.call(this, data);
        var key;
        // set widget image [graph snapshot]
        var widgetImage = new image_factory_1.ImageFactory(data['images'][0]).generate();
        key = Object.keys(widgetImage)[0];
        this._body[key] = widgetImage[key];
        // create table data
        // TODO draw color
        data['tableRowsData'].forEach(function (row) {
            //row[0] = new RectFactory(row[0]['color'], row[0]['dashed']).generate();
            //key = Object.keys(row[0])[0];
            //console.log(row[0][key]['w:r']['mc:AlternateContent']['mc:Choice']['w:drawing']['wp:inline']['a:graphic']['a:graphicData']['wps:wsp']['wps:spPr']);
            //console.log(XMLBuilder.buildObject(row[0]));
            row[0] = 'TD'; //row[0]['color'];
        });
        var widgetTable = new table_factory_1.TableFactory(data['tableCols'], data['tableRowsData']).generate();
        key = Object.keys(widgetTable)[0];
        this._body[key] = widgetTable[key];
    }
    return SectionWidget;
})(section_1.Section);
exports.SectionWidget = SectionWidget;
//# sourceMappingURL=index.js.map