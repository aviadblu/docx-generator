'use strict';

import {Section} from "../section";
import {ISectionData} from '../section-interface';
import {EmptyRowFactory} from "../general-factories/emptyRow-factory";
import {H2Factory} from "../general-factories/h2-factory";
import {TableFactory} from "../table/factories/table-factory";

export class SectionGroupedTable extends Section {
    constructor(data:ISectionData) {
        super(data);
        var _self = this;
        var groupsCounter = 0;
        data['tableRowsData'].forEach(function(groupData){
            let key;

            if(groupsCounter > 0) {
                let emptyRowObj = new EmptyRowFactory().generate();
                key = Object.keys(emptyRowObj)[0];
                _self.body[key] = emptyRowObj[key];
            }

            let h2Obj = new H2Factory(groupData['name']).generate();
            key = Object.keys(h2Obj)[0];
            _self._body[key] = h2Obj[key];

            let tableObj = new TableFactory(data['tableCols'], groupData['data']).generate();
            key = Object.keys(tableObj)[0];
            _self._body[key] = tableObj[key];

            groupsCounter++;
        });
    }
}