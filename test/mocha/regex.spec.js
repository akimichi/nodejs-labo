"use strict";

var expect = require('expect.js');

describe("regex", () => {
  describe("日付を認識する", () => {
    it("YYYY-MM-DDの形式で日付を認識する", (next) => {
      expect(
        /^\d\d\d\d-\d\d-\d\d/.test("abc") 
      ).to.eql(
        false 
      );
      expect(
        /^\d\d\d\d-\d\d-\d\d/.test("2017-09-07") 
      ).to.eql(
        true 
      );
      next();
    });
  });
  describe("testメソッド", () => {
    it(";;で始まる ", (next) => {
      expect(
        /^;;abc/.test(";;abc") 
      ).to.eql(
        true 
      );
      expect(
        /^;;.+$/.test(";;abc") 
      ).to.eql(
        true 
      );
      next();
    });
  });
  describe("skkのエントリ", () => {
    const regex = /^(\S+)\s\/([^\/]*)\//; 
    it("testメソッド", (next) => {
      expect(
        regex.test("わるs /悪/") 
      ).to.eql(
        true 
      );
      next();
    });
    it("matchメソッド", (next) => {
      const result = String("わるs /悪/").match(regex);
      expect(
        result[0]
      ).to.eql(
        "わるs /悪/" 
      );
      expect(
        result[1]
      ).to.eql(
        "わるs" 
      );
      expect(
        result[2]
      ).to.eql(
        "悪" 
      );
      next();
    });
  });
  describe("match", () => {
    it("日付をパースする", (next) => {
      var result = String("1999-01-30").match(/([0-9]+)-([0-9]+)-([0-9]+)/);
      expect(
        result[1]
      ).to.eql(
        '1999'
      );
      expect(
        result[2]
      ).to.eql(
        '01'
      );
      expect(
        result[3]
      ).to.eql(
        '30'
      );
      next();
    });
    it("; separated", (next) => {
      var result = String(";1001;00000000;159;003;1007bbd;2970;2680;6696;1116;0858;L;").match(/;([0-9]+);([^;]*);([0-9]+);([0-9]+);([0-9a-z]+);([0-9]+);([0-9]+);([0-9]+);([0-9]+);.*/);
      // var result = String(";1002;00000000;159;003;1007bbd;2970;2680;6696;1116;0858;L;").match(/;([0-9]+);[^;]*;[0-9]+;[0-9]+;[0-9]+;[0-9a-z]+;[0-9]+;[0-9]+;[0-9]+;[0-9]+;[^;]*;/);
      expect(
        result[1]
      ).to.eql(
        '1001'
      );
      expect(
        result[2]
      ).to.eql(
        '00000000'
      );
      expect(
        result[7]
      ).to.eql(
        '2680'
      );
      next();
    });
    it("standard format for twe-lite", function(next) {
      var result = String("::rc=80000000:lq=123:ct=00E9:ed=8100EC1A:id=0:ba=2740:te=2820:a0=1384:a1=882").match(/:ba=([0-9]+)/);
      expect(
        result[1]
      ).to.eql(
        '2740'
      );
      expect(
        parseInt(result[1],10) / 100.0
      ).to.eql(
        27.4
      );
      next();
    });
  });
});
