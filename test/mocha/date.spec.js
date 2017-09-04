"use strict";

var expect = require('expect.js');


describe("Date型", () => {
  describe("date-utilsで表示形式を整える", () => {
    require('date-utils');

    var dt = new Date(2017,9,3);
    expect(dt.toFormat("YYYY-MM")).to.eql(
      "2017-10"
    );
  });
  describe("Dateオブジェクトを生成する", () => {
    it("new Dateで生成する", (next) => {
      var then = new Date("2013/2/15 17:57:27");
      expect(then.getFullYear()).to.eql(
        2013
      );
      expect(then.getMonth()).to.eql(
        1
      );
      expect(then.getHours()).to.eql(
        17
      );
      expect(then.getMinutes()).to.eql(
        57
      );
      expect(then.getSeconds()).to.eql(
        27
      );
      next();
    });
    // it("new Dateでローカル時間で生成する", (next) => {
    //   var then = new Date(2011, 5, 26, 7, 56, 0, 123); // local time
    //   expect(then).to.eql(
    // 	Date.UTC(2011, 4, 26, 7, 56, 0, 123)
    //   );
    //   next();
    // });
    // it("jsonから生成する", (next) => {
    //   var jsonDate = "2011-05-26T07:56:00.123Z";
    //   var then = new Date(2011, 5, 26, 7, 56, 0, 123); // local time
    //   //var then = new Date(jsonDate);
    //   expect(then).to.eql(
    // 	Date.UTC(2011, 4, 26, 7, 56, 0, 123) // Returns the millisecond representation of the specified UTC date and time
    //   );
    //   next();
    // });
  });
});

