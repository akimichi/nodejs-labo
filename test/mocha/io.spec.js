"use strict";

var expect = require('expect.js');
var sys = require('sys');
var fs = require('fs');

describe('IO', function() {
  describe('file', function() {
	after(() => {
	  fs.writeFileSync('test/resources/file.txt', "This is a test.");
	});
    it('read', (next) => {
	  var file = fs.readFileSync("test/resources/file.txt", 'utf8');
      expect(
		file.length
	  ).to.be(
		15
	  );
      expect(
		file
	  ).to.be(
		"This is a test."
	  );
	  next();
    });
    it('write', (next) => {
	  fs.writeFileSync('test/resources/file.txt', "This is another test.")
	  var file = fs.readFileSync("test/resources/file.txt", 'utf8');
      expect(
		file
	  ).not.to.be(
		"This is a test."
	  );
	  next();
    });
  });
});
