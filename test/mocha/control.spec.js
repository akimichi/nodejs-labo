"use strict";

var expect = require('expect.js');

describe("制御構造", function() {
  describe("条件文", function() {
	/* #@range_begin(if) */
	it("if文", function(next) {
	  var x = 0;
	  if (x === 0) {
		expect(x).to.eql(0);
	  } else {
		fail();
	  }
	  var abs = function(x){
  		if (x > 0) {
		  return x;
		} else {
		  return - x;
		}
	  };
	  expect(abs(3)).to.eql(3);
	  expect(abs(-3)).to.eql(3);
	  next();
    });
	/* #@range_end(if) */
	/* #@range_begin(switch) */
	it("switch文", function(next) {
	  var expression = 2 * 3;
    switch (expression){
      case 0:
        fail();
        break;
      case 6:
        expect(expression).to.eql(6);
        break;
      default:
        fail();
        break;
    }
    next();
	});
	/* #@range_end(switch) */
  });
  describe("反復文", function() {
	it("while文", function(next) {
	  var counter = 0;
	  while (counter < 10) {
		counter += 1;
	  }
	  expect(counter).to.eql(10);
	  next();
	});
	it("for文", function(next) {
	  var counter;
	  for (counter = 0; counter < 10; counter += 1) {
		;
	  }
	  expect(counter).to.eql(10);
	  next();
	});
  });
});

