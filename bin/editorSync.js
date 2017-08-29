"use strict";

const child_process = require('child_process'),
  fs = require('fs'),
  tmp = require('tmp');

const editor = process.env.EDITOR || 'nvim';


tmp.file(function _tempFileCreated(err, path, fd, cleanupCallback) {
  if (err) throw err;

  console.log('File: ', path);
  console.log('Filedescriptor: ', fd);
  var args = [path];

  var childProcess = child_process.spawnSync(editor, args, {
    stdio: 'inherit',
    shell: true,
    cwd: process.cwd(),
    env: process.env,
    // stdio: 'pipe',
    encoding: 'utf-8'
  });
  // console.log(childProcess); // [ null, 'hello world\n', '' ]

  fs.readFile(path, (err, data) => {
    if (!err) {
      console.log(data.toString());
    }
  });
});

