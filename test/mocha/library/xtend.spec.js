"use strict";

const expect = require('expect.js');


describe("xtendライブラリ", () => {
  const  extend = require("xtend")


  it('オブジェクトをマージする', (next) => {
    // extend returns a new object. Does not mutate arguments 

    expect(
      extend({
        a: "a",
        b: 'c'
      }, {
        b: "b"
      })
    ).to.eql(
      {
        a: "a",
        b: 'b'
      }
    );
    next();
  });
});
