"use strict";

const expect = require('expect.js');

describe("Promise", () => {
  describe("bluebird", () => {
    const Promise = require("bluebird");

    it("test async function by promise",  (done) => {  
      let asyncFunction = () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('Async Hello world');
          }, 16);
        });
      };

      asyncFunction().then((value) => {
        // expect(value).to.equal("")
        expect(value).to.equal("Async Hello world")
        done();
      }).catch((error) => {
        done(error); 
      });
    });
  });
});
