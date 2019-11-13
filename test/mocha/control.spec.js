"use strict";

var expect = require('expect.js');

describe("制御構造", function() {
  describe("条件文", function() {
    it("三項演算子", (next) =>  {
      const character = "\n";
      expect(
        (character === "\n") ? true : false
      ).to.eql(true)
      next();
    });
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
    describe("switch文", function() {
      it("通常の用法", function(next) {
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
      it("正規表現で分岐する", function(next) {
        const test = (source) => {
          switch (true){
            case /first/.test(source):
              return source;
            case /last/.test(source):
              return source;
            case /[0-9]+/.test(source):
              return source;
            default:
              return null;
          }
        };
        expect(
          test("first")
        ).to.eql("first");
        expect(
          test("second")
        ).to.eql(null);
        expect(
          test(123)
        ).to.eql(123);
        expect(
          test("123")
        ).to.eql(123);
        next();
      });
    });
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
  describe("例外処理", function() {
    it("try catch")
    // it("try catch", function(next) {
    //   expect(counter).to.eql(10);
    //   next();
    // });
  });
});

