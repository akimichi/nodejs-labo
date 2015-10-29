var expect;

expect = require('expect.js');

describe("値", function() {
  return it('数値', function() {
    return expect(1).to.be(1);
  });
});

describe("if", function() {
  return it('even', function(next) {
    var even;
    even = function(n) {
      if ((n % 2) === 0) {
        return true;
      } else {
        return false;
      }
    };
    expect(even(2)).to.be(true);
    expect(even(3)).to.be(false);
    return next();
  });
});
