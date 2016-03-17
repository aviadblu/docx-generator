'use strict';

import {Section} from "../section";
import {ISectionData} from '../section-interface';
import {TableFactory} from "./factories/table-factory";

export class SectionTable extends Section {
    constructor(data:ISectionData) {
        super(data);
        this._body = new TableFactory(data.tableCols, data.tableRowsData).generate();
    }
}