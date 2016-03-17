'use strict';
var uuid = require('uuid');
var h1_factory_1 = require("./general-factories/h1-factory");
var description_factory_1 = require("./general-factories/description-factory");
var Section = (function () {
    function Section(data) {
        this._body = {};
        this._name = data['name'] ? new h1_factory_1.H1Factory(data['name']).generate() : {};
        this._description = data['description'] ? new description_factory_1.DescriptionFactory(data['description']).generate() : {};
    }
    Section.getUniqueElementTag = function () {
        return '##' + uuid.v4() + '##';
    };
    Object.defineProperty(Section.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Section.prototype, "description", {
        get: function () {
            return this._description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Section.prototype, "body", {
        get: function () {
            return this._body;
        },
        enumerable: true,
        configurable: true
    });
    return Section;
})();
exports.Section = Section;
//# sourceMappingURL=section.js.map