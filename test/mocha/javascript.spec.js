"use strict";

var expect = require('expect.js');

describe("値", function() {
  describe("数値型", function() {
	/*
	Math.pow(2,53)
	Math.round(.6)
	Math.ceil(.6)
	Math.floor(.6)
	Math.abs(-5)
	Math.max(x,y,z)
	Math.min(x,y,z)
	Math.random()
	Math.PI
	Math.E
	Math.sqrt(3)
	Math.pow(3, 1/3)
	Math.sin(0)
	Math.log(10)
	Math.log(100)/Math.LN10
	Math.log(512)/Math.LN2
	Math.exp(3)
	 */
	it("数値型は不変である", function(next) {
	  /* #@range_begin(number_is_immutable) */
	  var two = 2;
	  expect(two).to.eql(2);
	  expect(Math.pow(two,3)).to.eql(8);
	  expect(two).to.eql(2);
	  /* #@range_end(number_is_immutable) */
	  next();
	});
	it("数値を文字列に変換する", function(next) {
	  expect(
		String(2)
	  ).to.eql(
		'2'
	  );
	  next();
	});
  });
});

describe("入出力", function() {
  var fs = require('fs');
  describe("ファイル操作", function() {
	it("同期処理によるファイルの書き込みと読み込み", function(next) {
	  var fileName = '/tmp/io.txt';
	  var writeValue = 'a';
	  fs.writeFileSync('/tmp/io.txt', writeValue);
	  var readValue = fs.readFileSync('/tmp/io.txt', 'utf8');
	  expect(writeValue).to.eql(readValue);
	  next();
	});
	// it("非同期処理によるファイルの書き込みと読み込み", function() {
	//   var fileName = '/tmp/io.txt'; // '/tmp/war_and_peace.txt';
	//   var writeValue = 'b'; // fs.readFileSync(fileName, 'utf8');
	//   var init = function(initValue){
	//   	return fs.writeFile(fileName, initValue, function (err) {
	//   	  if (err) throw err;
	//   	});
	//   };
	//   init(''); 	  //init(new Array[1]);
	//   fs.writeFile(fileName, writeValue, function (err) {
	// 	if (err) throw err;
	//   });
	//   fs.readFile(fileName, function (err, readValue) {
	// 	if (err) throw err;
	// 	expect(writeValue).to.eql(readValue);
	// 	//expect(writeValue).to.eql('');
	//   });
	//   return jasmine.asyncSpecWait();
	// });
	it("ファイルのオープンとクローズ", function(next) {
	  var fileName = '/tmp/io.txt';
	  fs.open(fileName, "r", function(error, fd) {
        fs.close(fd);
      });
	  next();
	});
  });
});

describe("ジェネレータ", function() {
  it("yield", function(next) {
	function* count() {
	  yield 1;
	  yield 2;
	  yield 3;
	  yield 4;
	  return 5;
	}
	var counter = count(); 
	expect(counter.next().value).to.eql(1);
	expect(counter.next().value).to.eql(2);
	next();
  });
  it("fromEnum", function(next) {
	/* #@range_begin(generator_fromEnum) */
	var fromEnum = function* (from, step) {
	  while(true){
		yield from;
		from = step(from);
	  }
	};
	/* #@range_end(generator_fromEnum) */
	/* #@range_begin(generator_fromEnum_test) */
	var succ = function(n){
	  return n + 1;
	};
	var ints = fromEnum(0,succ); 
	expect(ints.next().value).to.eql(0);
	expect(ints.next().value).to.eql(1);
	expect(ints.next().value).to.eql(2);
	/* #@range_end(generator_fromEnum_test) */
	next();
  });
});



