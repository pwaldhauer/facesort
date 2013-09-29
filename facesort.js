#!/usr/bin/env node

var cv = require('opencv');
var path = require('path');
var async = require('async');
var fs = require('fs');
var _ = require('underscore');
var optimist = require('optimist')
    .usage('Sorts images with faces. Usage: $0 -i [path]')
    .alias('i', 'in')
    .describe('i', 'Path of the directory containing the files')
    .alias('f', 'face')
    .describe('f', 'Path images containing faces should be moved to')
    .alias('n', 'noface')
    .describe('n', 'Path images containing NO faces should be moved to')
    .alias('p', 'parallel')
    .describe('p', 'Maximum number concurrent face detections')
    .alias('c', 'cascade')
    .describe('c', 'Cascade file to use')
    .alias('l', 'list')
    .describe('l', 'Prints a list of available cascade files')
    .alias('h', 'help')
    .describe('h', 'Shows this help')
    .default({
        'i': '.',
        'f': path.resolve(__dirname, 'face'),
        'n': path.resolve(__dirname, 'noface'),
        'p': 10,
        'c': 'haarcascade_frontalface_default'
    });

var argv = optimist.argv;

if(argv.h) {
    optimist.showHelp(console.log);

    process.exit(0);
}

if(argv.l) {
    console.log('Available cascade files:', "\n");
    _(fs.readdirSync(path.resolve(__dirname, 'node_modules/opencv/data'))).each(function(file) {
        console.log("\t", file.replace('.xml', ''));
    });

    process.exit(0);
}

var face = path.resolve(__dirname, 'node_modules/opencv/data/' + argv.c + '.xml');

if(!fs.existsSync(face)) {
    console.error('Cascade file not found: ' + face);
    process.exit(-1);
}

var extensions = ['.png', '.jpeg', '.jpg'];
var dir = argv.i;
var facedir = argv.f;
var nofacedir = argv.n;

_([facedir, nofacedir]).each(function(dir) {
    if(!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
});

var queue = async.queue(find_faces, argv.p);
queue.drain = function() {
    console.log("\nAll done!");
}

var files = [];
_(fs.readdirSync(dir)).each(function(file) {
    if(!_.contains(extensions, path.extname(file).toLowerCase())) {
        return;
    }

    files.push(path.join(dir, file));
});

console.log(' Input path: %s', dir);
console.log('  Face path: %s', facedir);
console.log('Noface path: %s', nofacedir);
console.log('Found files: %d', files.length, "\n");

queue.push(files);

function find_faces(file_path, cb) {
    cv.readImage(file_path, function(err, im) {
        im.detectObject(face, {}, function(err, faces) {
            var filename = path.basename(file_path);

            console.log('> %s: %d faces.', filename, faces.length);

            var new_path = faces.length ? path.join(facedir, filename) : path.join(nofacedir, filename);
            fs.renameSync(file_path, new_path);

            cb();
        });
    })
}



