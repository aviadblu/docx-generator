'use strict';

import {Section} from "../section";
import {ISectionData} from '../section-interface';
import {ImageFactory} from "./../general-factories/image-factory";
import {RectFactory} from "./factories/rect-factory";
import {TableFactory} from "../table/factories/table-factory";

// TODO remove
declare var require:any;
var xml2js = require('xml2js');
var XMLBuilder = new xml2js.Builder({pretty: false});

export class SectionWidget extends Section {
    constructor(data:ISectionData) {
        super(data);
        var _self = this;
        let key;
        // set widget image [graph snapshot]
        let widgetImage = new ImageFactory(data['images'][0]).generate();
        key = Object.keys(widgetImage)[0];
        this._body[key] = widgetImage[key];

        // create table data
        // TODO draw color
        data['tableRowsData'].forEach(function(row){
            //row[0] = new RectFactory(row[0]['color'], row[0]['dashed']).generate();
            //key = Object.keys(row[0])[0];
            //console.log(row[0][key]['w:r']['mc:AlternateContent']['mc:Choice']['w:drawing']['wp:inline']['a:graphic']['a:graphicData']['wps:wsp']['wps:spPr']);
            //console.log(XMLBuilder.buildObject(row[0]));
            row[0] = 'TD';//row[0]['color'];
        });


        let widgetTable = new TableFactory(data['tableCols'], data['tableRowsData']).generate();
        key = Object.keys(widgetTable)[0];
        this._body[key] = widgetTable[key];

    }
}