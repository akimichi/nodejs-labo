"use strict";

const  tty = require('tty'),
  child_process = require('child_process'),
  fs = require('fs');



const tmp = require('tmp');

var editor = process.env.EDITOR || 'vim';

var child = child_process.spawn(editor, ['/tmp/somefile.txt'], {
  stdio: 'inherit'
});

child.on('exit', function (e, code) {
  console.log("finished");
});
