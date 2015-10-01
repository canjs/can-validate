
var fs = require('fs'),
    stealTools = require("steal-tools"),
    replace = require('replace'),
    mv = require('mv'),
    copy = require('copy-files'),
    copyDir = require('directory-copy'),
    docConfig = require('./documentjs.json');
    // Issue: https://github.com/bitovi/documentjs/pull/71
    var documentjs = require('documentjs/lib/configured/configured');

// build docs
console.log('Building Docs...');
var def = documentjs.generateProject({
        docConfig:  docConfig,
        path: process.cwd()
    }, undefined, {
        debug: true
    });

def.then(function () {
    // copy docs
    console.log('Copying docs...');
    copyDir({
        src: 'docs',
        dest: 'public/docs'
    }, function (err) {
        if (err) {
            console.log(err);
        }
        console.log('Docs copied');
    });

    // copy demos
    console.log('Copying demos...');
    copyDir({
        src: 'dist/cjs',
        dest: 'public/'
    }, function (err) {
        if (err) {
            console.log(err);
        }
        console.log('Copying demo html...');
        copy({
                files: {
                    'validate.demo.html':'./can-validate/map/validate/demo/validate.prod.html'
                },
                dest: './public/map/validate/demo'
            },function (err) {
                if (err) {
                    console.log(err);
                }
                console.log('First demo Copied.');
        });

        console.log('Copying last demo html...');
        copy({
                files: {
                    'can-validate.demo.html': './can-validate/demo/can-validate.prod.html'
                },
                dest: './public/can-validate/demo'
            },function (err) {
                if (err) {
                    console.log(err);
                }
                console.log('Demos Copied.');
        });
    });
});
