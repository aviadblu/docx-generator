'use strict';
declare var require:any;
var uuid = require('uuid');
import {H1Factory} from "./general-factories/h1-factory";
import {DescriptionFactory} from "./general-factories/description-factory";
import {ISectionData} from './section-interface';

export class Section {
    private _name:Object;
    private _description:Object;
    protected _body:Object = {};

    public static getUniqueElementTag():string {
        return '##' + uuid.v4() + '##';
    }

    public constructor(data:ISectionData) {
        this._name = data['name'] ? new H1Factory(data['name']).generate() : {};
        this._description = data['description'] ? new DescriptionFactory(data['description']).generate() : {};
    }

    get name():Object {
        return this._name;
    }

    get description():Object {
        return this._description;
    }

    get body():Object {
        return this._body;
    }

}
