"use strict";

var expect = require('expect.js');

describe("配列について", () => {
  var ary = [0,1,2,3,4];

  it('配列にアクセスする', function(next) {
	expect(ary[0]).to.eql(0);
	next();
  });
  it('lengthで配列の長さを得る', function(next) {
	expect(ary.length).to.eql(5);
	next();
  });
  it('配列を連結するconcatは非破壊的である', function(next) {
	/* #@range_begin(array_concat) */
	expect(ary.concat([5,6,7])).to.eql([0,1,2,3,4,5,6,7]);
	expect(ary).to.eql([0,1,2,3,4]); // 元の配列には変更がない
	expect([1,2,3].concat([])).to.eql([1,2,3]);
	/* #@range_end(array_concat) */
	next();
  });
  it('sliceで配列の部分を得る', function(next) {
	expect(ary.slice(0,2)).to.eql([0,1]);
	expect(ary.slice(0,1)).to.eql([0]);
	expect(ary.slice(1,ary.length)).to.eql([1,2,3,4]);
	// 元の配列には変更がない
	expect(ary).to.eql([0,1,2,3,4]);

	expect([1].slice(1,[1].length)).to.eql([]);
	next();
  });
  it('Array.reverseは破壊的操作である', function(next) {
	/* #@range_begin(destructive_reverse) */
    var ary = [1,2,3,4,5];
    expect(
	  ary.reverse()
	).to.eql(
	  [5,4,3,2,1]
	);
    expect(
	  ary
	).not.to.eql(
	  [1,2,3,4,5]
	);
    expect(
	  ary
	).to.eql(
	  [5,4,3,2,1]
	);
	/* #@range_end(destructive_reverse) */
	next();
  });
  it('Array.map', function(next) {
	expect([1,2,3].map(function(i){return i*2;})).to.eql([ 2,4,6 ]);
	next();
  });
  it('Array.reduce', (next) => {
	expect(
	  [1,2,3].reduce((accumulator, value) => {
		console.log(accumulator);
		return 1 + accumulator;
      }, 0)
	).to.eql(
	  3
	);
	next();
  });
  it('Array.sortで配列を並べかえる', function(next) {
	/* #@range_begin(array_sort) */
	var array = [0,1,2,3,4];
	expect(array.sort(function compare(x,y){
	  return x - y;
	})).to.eql([ 0, 1, 2, 3, 4 ] );
	expect(array.sort(function compare(x,y){
	  return y - x;
	})).to.eql([ 4, 3, 2, 1, 0 ]);
	/* #@range_end(array_sort) */
	next();
  });
});

