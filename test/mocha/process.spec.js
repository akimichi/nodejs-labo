"use strict";

const expect = require('expect.js'),
  tty = require('tty'),
  child_process = require('child_process'),
  fs = require('fs');


describe("processを操作する", () => {
  const  extend = require("xtend")

  // it('processでエディタを立ち上げる', (next) => {
  //   const tmp = require('tmp');

  //   var editor = process.env.EDITOR || 'vim';

  //   var child = child_process.spawn(editor, ['/tmp/somefile.txt'], {
  //     stdio: 'inherit'
  //   });

  //   child.on('exit', function (e, code) {
  //     console.log("finished");
  //   });
  //   next();
  // });
});
