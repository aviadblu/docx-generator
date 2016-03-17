'use strict';

export class Config {
    static _DOCUMENT_WIDTH:number = 10790;
    static _DEFAULT_FONT:string = 'Metric Web Light';
    static _GRID_STYLE:string = 'PlainTable1'; //'GridTable2-Accent3'

    static get DOCUMENT_WIDTH():number {
        return this._DOCUMENT_WIDTH;
    }

    static get DEFAULT_FONT():string {
        return this._DEFAULT_FONT;
    }

    static get GRID_STYLE():string {
        return this._GRID_STYLE;
    }
}