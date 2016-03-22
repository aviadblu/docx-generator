'use strict';
declare var require:any;
declare var __dirname:any;
declare var module:any;

var fs = require('fs-extra');
var path = require('path');
var exec = require('child_process').exec;
var Q = require('q');
var _ = require('lodash');
var xml2js = require('xml2js');
var XMLBuilder = new xml2js.Builder({pretty: false});

type Promise = any;

import {Section} from "./sections/section";
import {ISectionData} from './sections/section-interface';
import {DocumentFileFactory} from "./docx-files-factories/document-file-factory";
import {CoreFileFactory} from "./docx-files-factories/core-file-factory";
import {RelsDocumentFileFactory} from "./docx-files-factories/rels_document-file-factory";
import {SectionCover} from "./sections/cover/index";
import {SectionTable} from "./sections/table/index";
import {SectionGroupedTable} from "./sections/grouped-table/index";
import {SectionWidget} from "./sections/widget/index";

export class Docx {
    // target file path
    private target:string;
    // document name & target file name + [.docx]
    private name:string;
    // reflection object for document.xml
    private document:Object = {};
    // reflection object for core.xml
    private core:Object = {};
    // reflection object for _rels/document.xml.rels
    private rels_document:Object = {};
    // Relationships array holds the media metadata in the document
    private images_relationships:Array<Object> = [];
    // report section array
    private sections:Section[] = [];
    // tmp folder, used in creation process
    private tmpFolder:string;
    // docx folder inside tmp folder, used to create the end docx file
    private docxTmpFolder:string;
    // map section classes
    private typeConstructorMap:Object = {
        cover: SectionCover,
        table: SectionTable,
        groupedTable: SectionGroupedTable,
        widget: SectionWidget
    };

    // private methods

    private sectionsFactory(type:string, data:Object):Section {
        return this.typeConstructorMap[type] ? new this.typeConstructorMap[type](data) : null;
    };

    private copyFile(source:string, destination:string):Promise {
        var dfd = Q.defer();
        var copyFileCmd = 'cp ' + source + ' ' + destination;
        exec(copyFileCmd, function (error, stdout, stderr) {
            if (error) {
                dfd.reject(new Error(error));
            } else {
                dfd.resolve();
            }
        });
        return dfd.promise;
    }

    private deleteFolderRecursive(path:string):void {
        var _self = this;
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) {
                    _self.deleteFolderRecursive(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }

    private generateXML(object:Object):string {
        var xml = XMLBuilder.buildObject(object);
        // clean etags
        return xml.replace(/##+[A-Za-z0-9\-]+##/g, '');
    }

    private buildDocumentObject():void {
        var document = _.cloneDeep(this.document);


        // split document body
        var bodyBefore = {};
        var bodyAfter = {};
        var afterPlaceholder = false;
        var oBody = document['w:document']['w:body'];
        Object.keys(oBody).forEach(function (key) {
            if (key === 'sections:placeholder') {
                afterPlaceholder = true;
            } else if (!afterPlaceholder) {
                bodyBefore[key] = oBody[key];
            } else {
                bodyAfter[key] = oBody[key];
            }
        });

        // reset body
        document['w:document']['w:body'] = {};

        // build sections
        var sectionsObject = {},
            nameKey, descKey, bodyKeys = [];
        this.sections.forEach(function (section) {
            nameKey = Object.keys(section.name)[0];
            descKey = Object.keys(section.description)[0];
            bodyKeys = Object.keys(section.body);

            if (section.name[nameKey]) sectionsObject[nameKey] = section.name[nameKey];
            if (section.description[descKey]) sectionsObject[descKey] = section.description[descKey];
            bodyKeys.forEach(function (bodyElKey) {
                sectionsObject[bodyElKey] = section.body[bodyElKey];
            });
        });

        // build document body
        _.assign(document['w:document']['w:body'], bodyBefore, sectionsObject, bodyAfter);

        this.document = document;
    }

    private buildRelsDocumentObject():void {
        this.rels_document = new RelsDocumentFileFactory(this.images_relationships).generate();
    }

    private copyDocxMaster():Promise {
        var _self = this;
        var dfd = Q.defer();
        var master = path.join(__dirname, './master/');
        fs.copy(master, _self.docxTmpFolder, function (err) {
            if (err) {
                dfd.reject(err);
            } else {
                dfd.resolve(_self);
            }
        });
        return dfd.promise;
    }

    private generateDocxSources():Promise {
        var _self = this;

        // generate docx/docProps/core.xml file
        var coreXML = _self.generateXML(_self.core);
        var coreFileDfd = Q.defer();
        fs.writeFile(_self.docxTmpFolder + '/docProps/core.xml', coreXML, 'utf-8', function (error) {
            if (error) {
                coreFileDfd.reject(error);
            } else {
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
            } else {
                rels_documentFileDfd.resolve();
            }
        });

        // create media folder
        var copyFilesDfd = Q.defer();
        var copyFilesPromises = [];
        _self.images_relationships.forEach(function (imageToCopy) {
            copyFilesPromises.push(_self.copyFile(imageToCopy['url'], _self.docxTmpFolder + '/word/' + imageToCopy['localUrl']));
        });

        Q.all(copyFilesPromises)
            .then(function () {
                copyFilesDfd.resolve();
            })
            .catch(function (error) {
                copyFilesDfd.reject(error);
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
            } else {
                documentFileDfd.resolve();
            }
        });

        return Q.all([
            coreFileDfd.promise,
            rels_documentFileDfd.promise,
            copyFilesDfd.promise,
            documentFileDfd.promise
        ]);
    }

    private generateDocxFile():Promise {
        var _self = this;
        var dfd = Q.defer();

        var target = path.join(_self.target, _self.name + '.docx');

        var createZipCmd = 'zip -r ' + target + ' ./';
        exec(createZipCmd, {cwd: _self.docxTmpFolder}, function (error, stdout, stderr) {
            if (error) {
                dfd.reject(new Error(error));
            } else {
                //_self.deleteFolderRecursive(_self.tmpFolder);
                dfd.resolve();
            }
        });

        return dfd.promise;
    }

    private addImage(image_url:string):string {
        var nextIndex = this.images_relationships.length;
        var newFileId = 'image' + nextIndex;
        var split = image_url.split('.');
        var imageExt = split[split.length - 1];
        this.images_relationships.push({
            url: image_url,
            localUrl: 'media/' + newFileId + '.' + imageExt
        });
        return newFileId;
    }

    // public methods

    public constructor(tmpFolder:string, targetFolder:string, name:string) {
        this.target = targetFolder;
        this.name = name;
        this.document = new DocumentFileFactory().generate();
        this.core = new CoreFileFactory(name, name).generate();
        var tmp = new Date().getTime();
        this.tmpFolder = tmpFolder;
        this.docxTmpFolder = path.join(tmpFolder, '/docx');
    }

    public addSection(data:ISectionData):void {
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
        } else {
            throw new Error('Section type doesn\'t exists');
        }

    }

    public create():Promise {
        var _self = this;
        return this.copyDocxMaster()
            .then(function () {
                return _self.generateDocxSources();
            })
            .then(function () {
                return _self.generateDocxFile();
            });
    }

}