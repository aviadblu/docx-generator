'use strict';
declare var require:any;
declare var phantom:any;
declare var slimer:any;
declare var __dirname:any;
declare var module:any;
declare var $:any;

// /home/aviad/dev/report-docx/node_modules/slimerjs/bin/slimerjs renderScript.js --proxy=http://web-proxy.il.hpecorp.net:8080
// /home/aviad/dev/ptaas/main.server/node_modules/slimerjs/bin/slimerjs render.js
// /home/aviad/dev/ptaas/main.server/node_modules/slimerjs/bin/slimerjs render.js http://localhost:3030/headless/report-print/1/?TENANTID=aviad&capture=true&phantom=true

var page = require('webpage').create();
var url = phantom.args[0];
var tmp = phantom.args[1];
var system = require('system');
var fs = require('fs');

// settings
page.settings.userAgent = "Phantomjs exportPDF";
page.viewportSize = { width:1200, height:20000 };
///////////

var captureContent = function() {
    var htmlBody = page.evaluate(function () {
        return $('body').html();
    });

    system.stdout.writeLine(tmp + '/data.txt');

    fs.write(tmp + '/data.html', page.content, 'w');
};

var capture = function(targetFile, clipRect) {
    page.clipRect = clipRect;
    page.render(targetFile);
};

page.open(url);

var captureSections = function() {
    var sectionsToCapture = page.evaluate(function () {
        return document.getElementsByClassName("line-chart-wrapper");
    });

    var sectionsIdsWithCapture = page.evaluate(function () {
        var ret = [];
        var arr = $(".crawler-section").has('.line-chart-wrapper');
        arr.each(function(k,v){
            ret.push($(v).attr('id'));
        });
        return ret;
    });

    var fixBoundaries = function(val) {
        val = Math.round(val);
        if(val < 0) val = 0 ;
        return val;
    };

    for(var i = 0; i < sectionsToCapture.length; i++) {
        var sectionImage = sectionsToCapture[i];
        var sectionID = sectionsIdsWithCapture[i];
        var boundaries = sectionImage.getBoundingClientRect();

        capture(tmp + '/media/section_' + sectionID + '.png', {
            top: fixBoundaries(boundaries.top),
            left: fixBoundaries(boundaries.left),
            width: fixBoundaries(boundaries.width),
            height: fixBoundaries(boundaries.height)
        });
    }

    system.stdout.writeLine('===slimerjs::: Done!!!');
    slimer.exit();
};

var renderChecksLimit = 90; // in seconds
var renderChecksCounter = 0;

function renderIfReady() {
    var ready = page.evaluate(function () {
        var body = document.getElementsByTagName("body")[0];
        return body.className.indexOf('print-ready') > -1;
    });

    if (ready) {
        // wait 10 sec after print-ready
        window.setTimeout(function () {
            system.stdout.writeLine('===slimerjs::: ++++ render.js: success');
            captureContent();
            captureSections();
        }, 1000);
    }
    else if (renderChecksCounter >= renderChecksLimit) {
        system.stdout.writeLine('===slimerjs::: ++++ render.js: render checks limit exceeded');
        slimer.exit();
    }
    else {
        renderChecksCounter++;
        system.stdout.writeLine('===slimerjs::: ++++ render.js: not ready yet...');
        window.setTimeout(renderIfReady, 1000);
    }

}

page.onLoadFinished = function (status) {
    if (status !== 'success') {
        system.stdout.writeLine('===slimerjs::: ++++ render.js: unable to load the address!');
        slimer.exit();
    } else {
        renderIfReady();
    }
};