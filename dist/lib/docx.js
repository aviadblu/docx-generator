'use strict';
var fs = require('fs-extra');
var path = require('path');
var exec = require('child_process').exec;
var Q = require('q');
var _ = require('lodash');
var xml2js = require('xml2js');
var XMLBuilder = new xml2js.Builder({ pretty: false });
var document_file_factory_1 = require("./docx-files-factories/document-file-factory");
var core_file_factory_1 = require("./docx-files-factories/core-file-factory");
var rels_document_file_factory_1 = require("./docx-files-factories/rels_document-file-factory");
var index_1 = require("./sections/cover/index");
var index_2 = require("./sections/table/index");
var index_3 = require("./sections/grouped-table/index");
var index_4 = require("./sections/widget/index");
var Docx = (function () {
    // public methods
    function Docx(tmpFolder, targetFolder, name) {
        // reflection object for document.xml
        this.document = {};
        // reflection object for core.xml
        this.core = {};
        // reflection object for _rels/document.xml.rels
        this.rels_document = {};
        // Relationships array holds the media metadata in the document
        this.images_relationships = [];
        // report section array
        this.sections = [];
        // map section classes
        this.typeConstructorMap = {
            cover: index_1.SectionCover,
            table: index_2.SectionTable,
            groupedTable: index_3.SectionGroupedTable,
            widget: index_4.SectionWidget
        };
        this.target = targetFolder;
        this.name = name;
        this.document = new document_file_factory_1.DocumentFileFactory().generate();
        this.core = new core_file_factory_1.CoreFileFactory(name, name).generate();
        var tmp = new Date().getTime();
        this.tmpFolder = tmpFolder;
        this.docxTmpFolder = path.join(tmpFolder, '/docx');
    }
    // private methods
    Docx.prototype.sectionsFactory = function (type, data) {
        return this.typeConstructorMap[type] ? new this.typeConstructorMap[type](data) : null;
    };
    ;
    Docx.prototype.copyFile = function (source, destination) {
        var dfd = Q.defer();
        var copyFileCmd = 'cp ' + source + ' ' + destination;
        exec(copyFileCmd, function (error, stdout, stderr) {
            if (error) {
                dfd.reject(new Error(error));
            }
            else {
                dfd.resolve();
            }
        });
        return dfd.promise;
    };
    Docx.prototype.deleteFolderRecursive = function (path) {
        var _self = this;
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) {
                    _self.deleteFolderRecursive(curPath);
                }
                else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    };
    Docx.prototype.generateXML = function (object) {
        var xml = XMLBuilder.buildObject(object);
        // clean etags
        return xml.replace(/##+[A-Za-z0-9\-]+##/g, '');
    };
    Docx.prototype.buildDocumentObject = function () {
        var document = _.cloneDeep(this.document);
        // split document body
        var bodyBefore = {};
        var bodyAfter = {};
        var afterPlaceholder = false;
        var oBody = document['w:document']['w:body'];
        Object.keys(oBody).forEach(function (key) {
            if (key === 'sections:placeholder') {
                afterPlaceholder = true;
            }
            else if (!afterPlaceholder) {
                bodyBefore[key] = oBody[key];
            }
            else {
                bodyAfter[key] = oBody[key];
            }
        });
        // reset body
        document['w:document']['w:body'] = {};
        // build sections
        var sectionsObject = {}, nameKey, descKey, bodyKeys = [];
        this.sections.forEach(function (section) {
            nameKey = Object.keys(section.name)[0];
            descKey = Object.keys(section.description)[0];
            bodyKeys = Object.keys(section.body);
            if (section.name[nameKey])
                sectionsObject[nameKey] = section.name[nameKey];
            if (section.description[descKey])
                sectionsObject[descKey] = section.description[descKey];
            bodyKeys.forEach(function (bodyElKey) {
                sectionsObject[bodyElKey] = section.body[bodyElKey];
            });
        });
        // build document body
        _.assign(document['w:document']['w:body'], bodyBefore, sectionsObject, bodyAfter);
        this.document = document;
    };
    Docx.prototype.buildRelsDocumentObject = function () {
        this.rels_document = new rels_document_file_factory_1.RelsDocumentFileFactory(this.images_relationships).generate();
    };
    Docx.prototype.copyDocxMaster = function () {
        var _self = this;
        var dfd = Q.defer();
        var master = path.join(__dirname, './master/');
        fs.copy(master, _self.docxTmpFolder, function (err) {
            if (err) {
                dfd.reject(err);
            }
            else {
                dfd.resolve(_self);
            }
        });
        return dfd.promise;
    };
    Docx.prototype.generateDocxSources = function () {
        var _self = this;
        // generate docx/docProps/core.xml file
        var coreXML = _self.generateXML(_self.core);
        var coreFileDfd = Q.defer();
        fs.writeFile(_self.docxTmpFolder + '/docProps/core.xml', coreXML, 'utf-8', function (error) {
            if (error) {
                coreFileDfd.reject(error);
            }
            else {
                coreFileDfd.resolve();
            }
        });
        //generate docx/word/_rels/document.xml.rels file
        _self.buildRelsDocumentObject();
        var rels_documentXML = _self.generateXML(_self.rels_document);
        var rels_documentFileDfd = Q.defer();
        fs.writeFile(_self.docxTmpFolder + '/word/_rels/document.xml.rels', rels_documentXML, 'utf-8', function (error) {
            if (error) {
                rels_documentFileDfd.reject(error);
            }
            else {
                rels_documentFileDfd.resolve();
            }
        });
        // create media folder
        var copyFilesDfd = Q.defer();
        var copyFilesPromises = [];
        _self.images_relationships.forEach(function (imageToCopy) {
            copyFilesPromises.push(_self.copyFile(imageToCopy['url'], _self.docxTmpFolder + '/word/' + imageToCopy['localUrl']));
        });
        Q.all(copyFilesPromises).then(function () {
            copyFilesDfd.resolve();
        });
        // generate docx/word/document.xml file
        _self.buildDocumentObject();
        try {
            var documentXML = _self.generateXML(_self.document);
        }
        catch (err) {
            console.log(err);
        }
        var documentFileDfd = Q.defer();
        fs.writeFile(_self.docxTmpFolder + '/word/document.xml', documentXML, 'utf-8', function (error) {
            if (error) {
                documentFileDfd.reject(error);
            }
            else {
                documentFileDfd.resolve();
            }
        });
        return Q.all([
            coreFileDfd.promise,
            rels_documentFileDfd.promise,
            copyFilesDfd.promise,
            documentFileDfd.promise
        ]);
    };
    Docx.prototype.generateDocxFile = function () {
        var _self = this;
        var dfd = Q.defer();
        var target = path.join(_self.target, _self.name + '.docx');
        var createZipCmd = 'zip -r ' + target + ' ./';
        exec(createZipCmd, { cwd: _self.docxTmpFolder }, function (error, stdout, stderr) {
            if (error) {
                dfd.reject(new Error(error));
            }
            else {
                //_self.deleteFolderRecursive(_self.tmpFolder);
                dfd.resolve();
            }
        });
        return dfd.promise;
    };
    Docx.prototype.addImage = function (image_url) {
        var nextIndex = this.images_relationships.length;
        var newFileId = 'image' + nextIndex;
        var split = image_url.split('.');
        var imageExt = split[split.length - 1];
        this.images_relationships.push({
            url: image_url,
            localUrl: 'media/' + newFileId + '.' + imageExt
        });
        return newFileId;
    };
    Docx.prototype.addSection = function (data) {
        var _self = this;
        var sectionType = data['type'];
        // handle images
        if (data['images'] && data['images'].length > 0) {
            data['images'].forEach(function (image) {
                image.id = _self.addImage(image.url);
            });
        }
        var section = this.sectionsFactory(sectionType, data);
        if (section) {
            this.sections.push(section);
        }
        else {
            throw new Error('Section type doesn\'t exists');
        }
    };
    Docx.prototype.create = function () {
        var _self = this;
        return this.copyDocxMaster()
            .then(function () {
            return _self.generateDocxSources();
        })
            .then(function () {
            return _self.generateDocxFile();
        });
    };
    return Docx;
})();
exports.Docx = Docx;
//# sourceMappingURL=docx.js.map