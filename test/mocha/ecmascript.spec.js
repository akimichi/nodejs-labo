"use strict";

const expect = require('expect.js');

describe("ECMAScript", () => {
  describe("let", () => {
    it('letはブロックスコープの変数を宣言する', (next) => {
      let a = 12; //accessible globally
      function myFunction() {
        let b = 13; //accessible throughout function
        if(true) {
          let c = 14; //accessible throughout the "if" statement
          expect(c).to.eql(14);
        }

        expect(function(){
          c
        }).to.throwError();

        expect(function(){
          c
        }).to.throwException(e => {
          expect(e).to.be.a(ReferenceError);
        });
      }
      next();
    });
  });

});
