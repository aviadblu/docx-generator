'use strict';

import {ISectionImage} from "./widget/factories/image-interface";

export interface ISectionData {
    name?: string;
    description?: string;
    type: string;
    testName?: string;
    status?: string;
    tableCols?: Array<Object>;
    tableRowsData?: Array<Object>;
    images?: Array<ISectionImage>
}