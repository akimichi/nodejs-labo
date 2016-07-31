
"use strict";

var expect = require('expect.js');

describe("regex", function() {
    describe("match", function() {
        it("; separated", function(next) {
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
        it("; standard format for twe-lite", function(next) {
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
