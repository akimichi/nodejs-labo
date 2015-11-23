"use strict";

var expect = require('expect.js');
var util = require('util');

describe("util", () => {
  it("format", (next) => {
	expect(
	  util.format('%s', 'foo')
	).to.eql(
	  "foo"
	);
	expect(
	  util.format('%s', 'foo')
	).to.eql(
	  "foo"
	);
	next();
  });
});
