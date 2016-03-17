"use strict";

var expect = require('expect.js');


describe("String型", function() {
  it("文字列リテラル", function(next) {
	var str = "string";
	expect(str).to.eql("string");
	next();
  });
describe("文字列を連結する", () => {
  it("string.concatで文字列を連結できる", (next) => {
    var a = "a";
    var b = "b";
    expect(
      a.concat(b)
    ).to.be("ab");
    next();
  });
  it("+演算子で文字列を連結できる", function(next) {
	var a = "a";
	var b = "b";
	expect(a + b).to.be("ab");
	next();
  });
  });
  it("splitで文字列を分割できる", function(next) {
	var str = "123 455 789";
	expect(str.split(' ')).to.eql(["123", "455", "789"]);
	next();
  });
  it("toUpperCaseで大文字に変換する ", function(next) {
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
  describe("文字列を置換する", function() {
    var string = "ジャンプ";
    expect(
     string.replace("ジャンプ","jump")
    ).to.eql(
      "jump"
    );
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
    describe("正規表現マクロ", () => {
	  it("\\xhh は hh (2 桁の 16 進数) というコードを持つ文字列にマッチする")
	  it("[]を使う", (next) => {
		var buffer = ":788115012A8100247F7841E1000C8323000037FFFFFFFC27".match(/:7881([0-9A-Z]+)/);
		expect(
          buffer[1]
		).to.be(
          "15012A8100247F7841E1000C8323000037FFFFFFFC27"
		);
		expect(
          buffer[1]
		).to.be(
          "15012A8100247F7841E1000C8323000037FFFFFFFC27"
		);
		next();
	  });
	  it("{}で回数を指定する", (next) => {
		//            :788115015A8100247F7833D9000B7123000037FFFFFFFD1F
		//                                                 __      __
		var buffer = ":788115012A8100247F7841E1000C8323000037FFFFFFFC27".match(/:7881[0-9A-Z]{32}([0-9A-Z]{2})[0-9A-Z]{6}([0-9A-Z]{2})/);
		//                 123456789                      
		//                         10                     
		//                          1123456789            
		//                                   20           
		//                                    2123456789  
		//                                             30 
		//                                              3123456789
		//                                                       40
		//                                                        41234
		expect(
          buffer[1]
		).to.be(
          "37"
		);
		expect(
          buffer[2]
		).to.be(
          "FC"
		);
		next();
	  });
	  
    });
	it("()によるグルーピング", function(next) {
	  var result = "12:34:56".match(/(\d+):(\d+):(\d+)/);
	  expect(result[0]).to.be("12:34:56");
	  expect(result[1]).to.be("12");
	  expect(result[2]).to.be("34");
	  expect(result[3]).to.be("56");
	  next();
	});
  });
});
