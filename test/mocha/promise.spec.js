"use strict";

const expect = require('expect.js');

describe("Promise", () => {
  describe("bluebird", () => {
    const Promise = require("bluebird");

    it("Promiseを使った関数を定義する",  (done) => {  
      // 非同期関数をpromiseで定義する
      let asyncFunction = () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('Async Hello world');
          }, 16);
        });
      };
      // 非同期関数をテストする
      asyncFunction()
        .then((value) => {
          // expect(value).to.equal("")
          expect(value).to.equal("Async Hello world")
          done();
        })
        .catch((error) => {
          expect().fail(); 
          done(error); 
        });
    });
  });
});
