'use strict';

import {Section} from "../section";
import {ISectionData} from '../section-interface';
import {ImageFactory} from "../general-factories/image-factory";
import {H2Factory} from "../general-factories/h2-factory";
import {TableFactory} from "../table/factories/table-factory";


export class SectionDistribution extends Section {


    constructor(data:ISectionData) {
        super(data);
        var _self = this;

        data['sites'].forEach(function(site){
            // create h2
            let h2 = new H2Factory(site['headline']).generate();
            key = Object.keys(h2)[0];
            _self._body[key] = h2[key];

            // TODO create table
            //console.log(site['tableRowsData']);
            let table = new TableFactory(site['tableCols'], site['tableRowsData']).generate();

            key = Object.keys(table)[0];
            //console.log(table[key]);
            _self._body[key] = table[key];
        });
        

        let key;
        // set widget image [graph snapshot]
        let distGraphImage = new ImageFactory(data['images'][0]).generate();
        key = Object.keys(distGraphImage)[0];
        this._body[key] = distGraphImage[key];


    }
}