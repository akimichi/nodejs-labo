"use strict";

const expect = require('expect.js'),
  tty = require('tty'),
  child_process = require('child_process'),
  fs = require('fs');


describe("processを操作する", () => {
  const  extend = require("xtend")

  it('processでエディタを立ち上げる', (next) => {
    const tmp = require('tmp');

		var editor = process.env.EDITOR || 'vim';

		var child = child_process.spawn(editor, ['/tmp/somefile.txt'], {
			stdio: 'inherit'
		});

		child.on('exit', function (e, code) {
			console.log("finished");
		});
    // const spawnVim = (file, callback) => {
    //   var vim = child_process.spawn( 'vim', [file])

    //   const indata = (c) => {
    //     vim.stdin.write(c);
    //   };
    //   const outdata = (c) => {
    //     process.stdout.write(c);
    //   };

    //   process.stdin.resume();
    //   process.stdin.on('data', indata);
    //   vim.stdout.on('data', outdata);
    //   tty.setRawMode(true);

    //   vim.on('exit', (code) => {
    //     tty.setRawMode(false);
    //     process.stdin.pause();
    //     process.stdin.removeListener('data', indata);
    //     vim.stdout.removeListener('data', outdata);

    //     callback(code);
    //   });
    // };
    // // const tmp = require('tmp');
    // // const { spawn } = require('child_process');
		// const filename = "/tmp/somefile.txt";
		// spawnVim(filename, function(code) {
			// if (code == 0) {
				// fs.readFile(filename, function(err, data) {
					// if (!err) {
						// console.log(data.toString());
					// }
				// });
			// }
		// });

    // tmp.file(function _tempFileCreated(err, path, fd, cleanupCallback) {
    //   if (err) throw err;

    //   console.log('File: ', path);
    //   console.log('Filedescriptor: ', fd);

			// spawnVim(path, function(code) {
				// if (code == 0) {
					// fs.readFile(filename, function(err, data) {
						// if (!err) {
							// console.log(data.toString());
						// }
					// });
				// }
			// });

      // If we don't need the file anymore we could manually call the cleanupCallback 
      // But that is not necessary if we didn't pass the keep option because the library 
      // will clean after itself. 
      // cleanup();
    // });
    next();
  });
});
