describe('jasmine-node', function(){
  it('should pass', function(){
    expect(1+2).toEqual(3);
  });
});

describe("A suite", function() {
  it("contains spec with an expectation", function() {
     expect(true).toBe(true);
  });
  it("and can have a negative case", function() {
     expect(false).not.toBe(true);
  });
});

describe("pragmatic guide to javascript", function() {
  it("Achieving Code Privacy with the Module Pattern", function() {
     var obj = (function() {
                  var privateField = 42;
                  var publicField = 'foobar';
                  function processInternals() { privateField; }
                  function run() {
                    processInternals();
                  }
                  return {
                      publicField: publicField,
                      run: run
                  };
    })();

    expect(obj.publicField).toBe('foobar');
  });
});
