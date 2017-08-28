"use strict";

const child_process = require('child_process'),
  fs = require('fs'),
  tmp = require('tmp');

const editor = process.env.EDITOR || 'nvim';


tmp.file(function _tempFileCreated(err, path, fd, cleanupCallback) {
  if (err) throw err;

  console.log('File: ', path);
  console.log('Filedescriptor: ', fd);

  const child = child_process.spawn(editor, [path], {
    stdio: 'inherit'
  });
  child.on('exit',  (code, err) => {
    fs.readFile(path, (err, data) => {
      if (!err) {
        console.log(data.toString());
      }
    });
    console.log(`code: ${code}`);
    console.log(`err: ${err}`);
    console.log("finished");
  });
});

