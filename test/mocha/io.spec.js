"use strict";

var expect = require('expect.js');
var sys = require('sys');
var fs = require('fs');

describe('IO', function() {
  describe('file', function() {
	after(() => {
	  fs.writeFileSync('test/resources/file.txt', "This is a test.");
	});
    describe('read', () => {
      it('文字列として読み込む', (next) => {
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
      it('JSONとして読み込む', (next) => {
        expect(
          JSON.parse(fs.readFileSync("test/resources/json.txt", 'utf8'))
	    ).to.eql(
		  {
            "a": "a string",
            "number": 2,
            "child": {
              "memo": "child node"
            }
          }
	    );
	    next();
      });
    });
    describe('write', () => {
      it('文字列を出力する', (next) => {
	    fs.writeFileSync('test/resources/file.txt', "This is another test.");
	    var file = fs.readFileSync("test/resources/file.txt", 'utf8');
        expect(
		  file
	    ).not.to.be(
		  "This is a test."
	    );
	    next();
      });
      it('JSONを出力する', (next) => {
        var object = {
          "a": "a string",
          "number": 2,
          "child": {
            "memo": "child node"
          }
        };
	    fs.writeFileSync('test/resources/json.txt',  JSON.stringify(object, null, '    '));
        expect(
          JSON.parse(fs.readFileSync("test/resources/json.txt", 'utf8'))
	    ).to.eql(
		  object
	    );
	    next();
      });
    });
  });
});
