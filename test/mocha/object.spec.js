"use strict";

const expect = require('expect.js');

describe("オブジェクト", () => {
  describe("Object literal", () => {
    it("object literal を作成する", (next) => {
      var literal = {
        "name" : "an object",
        "value" : 1
      };
      expect(
        literal.name
      ).to.be(
        "an object"
      );
      next();
    });
    it("ネストする", (next) => {
      var variables = ["a"];
      var nested = {
        "lambda" : {
          "variables": variables,
          "body" : {
            "*" : [1,2]
          }
        }
      };
      expect(
        nested['lambda']['variables']
      ).to.be(
        variables
      );
      next();
    });
    it("数値をキーにする", (next) => {
      var object = {
        '-1' : "a",
        '0' : "b",
        '1' : "c"
      };
      expect(
        object['-1']
      ).to.be(
        "a"
      );
      next();
    });
    it("オブジェクトが空かどうかをチェックする", (next) => {
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var isEmpty = (obj) => {
        // null and undefined are "empty"
        if (obj == null) return true;
        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;
        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
          if (hasOwnProperty.call(obj, key)) return false;
        }
        return true;
      };
      expect(
        isEmpty({ key: 1})
      ).to.eql(
        false
      );
      expect(
        isEmpty({})
      ).to.eql(
        true
      );

      next();
    });
    describe("Object.assignでオブジェクトをマージする", () => {
      it("Object.assignでオブジェクトをマージする", (next) => {
        var merge = (obj1,obj2) => {
          var mergedObject = {};
          Object.assign(obj1,obj2);
          return obj1;
        };
        expect(
          merge({},{})
        ).to.eql(
          {}
        );
        expect(
          merge({a:1},{})
        ).to.eql(
          {a:1}
        );
        next();
      });
      it("for構文でオブジェクトをマージする", (next) => {
        var merge = (obj1,obj2) => {
          // for in 構文は非推奨となっている
          // Object.assignが推奨されている
          var mergedObject = {};
          for (var attrname in obj1) { mergedObject[attrname] = obj1[attrname]; }
          for (var attrname in obj2) { mergedObject[attrname] = obj2[attrname]; }
          return mergedObject;
        };
        expect(
          merge({},{})
        ).to.eql(
          {}
        );

        expect(
          merge({a:1},{})
        ).to.eql(
          {a:1}
        );

        next();
      });
    });
  });
  describe('JSONとの相互変換', function() {
    it("JSON.parseでJSON文字列をオブジェクトに変換する", (next) => {
      const json = `{"key": 1}`
      const obj = JSON.parse(json); 
      expect(
        obj['key'] 
      ).to.eql('1');
      // expect(
      //    JSON.parse(`{"key": 1 /* これはコメント */ }`)['key']
      // ).to.eql('1');
      next();
    });

  });
  describe('OOP related patterns', function() {
    it("object literal pattern", function(next) {
      var robot = {
        name: 'HAL9000'
        , getName: function () {
          return this.name;
        }
      };
      expect(robot.getName()).to.eql('HAL9000');
      next();
    });
    describe("custom constructor", function() {
      var Robot = function (name) {
        this.name = name;
        this.say= function() { // this function is created each time the object is created, hence not efficient.
          return 'hello';
        };
      };
      var hal9000 = new Robot('HAL9000');
      expect(hal9000.say()).to.eql('hello');
      it("if you forget new constructor")
      // it("if you forget new constructor", (next) => {
      //   var atom = Robot('atom');
      //   expect(typeof atom).to.eql('undefined');
      //   next();
      // });
    });
    it("constructor using prototype", (next) => {
      var Robot = function (name) {
        this.name = name;
        this.position = 0;
        this.say= function() {
          return 'hello';
        };
      };
      Robot.prototype.move = function(length){
        this.position = this.position + length;
      };
      var hal9000 = new Robot('HAL9000');
      expect(hal9000.position).to.eql(0);
      hal9000.move(2);
      expect(hal9000.position).to.eql(2);
      next();
    });
  });
  it("Object.freeze", (next) => {
    var obj = {
      content: 1
    };
    Object.freeze(obj);
    expect(function(){
      obj.content = 10; // TypeErrorが投げられる
    }).to.throwError();
    next();
  });
});

