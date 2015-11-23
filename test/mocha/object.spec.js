"use strict";

var expect = require('expect.js');

describe("オブジェクト", () => {
  describe("Object literal", () => {
	it("object literal を作成する", (next) => {
	  var literal = {
		"name" : "an object",
		"value" : 1
	  };
	  expect(
		literal.name
	  ).to.be(
		"an object"
	  );
	  next();
	});
	it("ネストする", (next) => {
	  var variables = ["a"];
	  var nested = {
		"lambda" : {
		  "variables": variables,
		  "body" : {
			"*" : [1,2]
		  }
		}
	  };
	  expect(
		nested['lambda']['variables']
	  ).to.be(
		variables
	  );
	  next();
	});
	it("数値をキーにする", (next) => {
	  var object = {
		'-1' : "a",
		'0' : "b",
		'1' : "c"
	  };
	  expect(
		object['-1']
	  ).to.be(
		"a"
	  );
	  next();
	});
  });
  describe('OOP related patterns', function() {
	it("object literal pattern", function(next) {
	  var robot = {
	  	name: 'HAL9000'
	  , getName: function () {
	  	  return this.name;
	  	}
	  };
	  expect(robot.getName()).to.eql('HAL9000');
	  next();
	});
	describe("custom constructor", function() {
	  var Robot = function (name) {
	  	this.name = name;
	  	this.say= function() { // this function is created each time the object is created, hence not efficient.
	  	  return 'hello';
	  	};
	  };
	  var hal9000 = new Robot('HAL9000');
	  expect(hal9000.say()).to.eql('hello');
	  it("if you forget new constructor"), (next) => {
		var atom = Robot('atom');
		expect(typeof atom).to.eql('undefined');
		next();
	  };
	});
	it("constructor using prototype", (next) => {
	  var Robot = function (name) {
		this.name = name;
		this.position = 0;
		this.say= function() {
		  return 'hello';
		};
	  };
	  Robot.prototype.move = function(length){
		this.position = this.position + length;
	  };
	  var hal9000 = new Robot('HAL9000');
	  expect(hal9000.position).to.eql(0);
	  hal9000.move(2);
	  expect(hal9000.position).to.eql(2);
	  next();
	});
  });
  it("Object.freeze", (next) => {
	/* #@range_begin(object_freeze_prevents_update) */
	var obj = {
	  content: 1
	};
	Object.freeze(obj);
	expect(function(){
	  obj.content = 10; // TypeErrorが投げられる
	}).to.throwError();
	/* #@range_end(object_freeze_prevents_update) */
	next();
  });
});

