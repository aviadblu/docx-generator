'use strict';
var Config = (function () {
    function Config() {
    }
    Object.defineProperty(Config, "DOCUMENT_WIDTH", {
        get: function () {
            return this._DOCUMENT_WIDTH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config, "DEFAULT_FONT", {
        get: function () {
            return this._DEFAULT_FONT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config, "GRID_STYLE", {
        get: function () {
            return this._GRID_STYLE;
        },
        enumerable: true,
        configurable: true
    });
    Config._DOCUMENT_WIDTH = 10790;
    Config._DEFAULT_FONT = 'Metric Web Light';
    Config._GRID_STYLE = 'PlainTable1'; //'GridTable2-Accent3'
    return Config;
})();
exports.Config = Config;
//# sourceMappingURL=config.js.map