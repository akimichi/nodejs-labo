"use strict";

var expect = require('expect.js');


describe("String型", function() {
  it("文字列リテラル", function(next) {
	var str = "string";
	expect(str).to.eql("string");
	next();
  });
  it("splitで文字列を分割できる", function(next) {
	var str = "123 455 789";
	expect(str.split(' ')).to.eql(["123", "455", "789"]);
	next();
  });
  it("toUpperCase", function(next) {
	var str = "string";
	expect(str.toUpperCase()).to.eql("STRING");
	expect(str).to.eql("string");
	next();
  });
  it("trim で端の空白を除去する", function(next) {
	var str = "  string  ";
	expect(str.trim()).to.eql("string");
	expect(str.trim()).not.to.eql(str);
	next();
  });
  it("+演算子で文字列を連結できる", function(next) {
	var a = "a";
	var b = "b";
	expect(a + b).to.be("ab");
	next();
  });
  it("charCodeAtは与えられた インデックスの文字の Unicode値を返す", function(next) {
	expect('a'.charCodeAt(0)).to.be(97);
	next();
  });
  describe('parseIntで文字列を数値に変換できる', function() {
	it('10進法として変換する', function(next) {
	  var number = "06";
	  expect(parseInt(number,10)).to.eql(6);
	  next();
	});
	it('2進法として変換する', function(next) {
	  expect(parseInt("01",2)).to.eql(1);
	  expect(parseInt("10",2)).to.eql(2);
	  next();
	});
	it('16進法として変換する', function(next) {
	  expect(parseInt("7F",16)).to.eql(127);
	  expect(parseInt("0C7F",16)).to.eql(3199);
	  next();
	});
  });
  it('toString(n)で文字列をn進数に変換できる', function(next) {
  	expect(parseInt("128",10).toString(16)).to.eql('80');
  	expect(parseInt("144",10).toString(16)).to.eql('90');
	next();
  });
  it("template関数を定義する", function(next) {
	var template = function(string,templateId, newSubstring, prefix){
	  if(prefix === undefined) {
		prefix = ":";
	  }
	  return string.split(prefix + templateId).join(newSubstring);  
	};
	expect(template("A :hole is filled", "hole", "template")).to.be("A template is filled");
	next();
  });
  describe("正規表現について", function() {
	it("Regex.match", function(next) {
	  var str = "ABCDEFG";
	  var re = new RegExp("DEF", "i");
	  expect(str.match(re)[0]).to.be("DEF");
	  next();
	});
	it("String.match", function(next) {
	  expect("ABCDEFG".match(/DEF/)[0]).to.be("DEF");
	  next();
	});
	it("()によるグルーピング", function(next) {
	  var result = "12:34:56".match(/(\d+):(\d+):(\d+)/);
	  expect(result[0]).to.be("12:34:56");
	  expect(result[1]).to.be("12");
	  expect(result[2]).to.be("34");
	  expect(result[3]).to.be("56");

	  var archetype_id = "openEHR-EHR-COMPOSITION.FIRST4_toyotomi_details.v1.r0.less".match(/(\w+-\w+-\w+\.\w+\.v\d+)/)[0];
	  //match(/(\w+-\w+-\w+\.\w+\.v\d+)\.less/)[0];
	  console.log("archetype_id", archetype_id);
	  next();
	});
  });
});
