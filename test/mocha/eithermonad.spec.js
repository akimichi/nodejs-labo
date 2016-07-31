"use strict";

var expect = require('expect.js');

var pair = {
    match : (data, pattern) => {
        return data.call(pair, pattern);
    },
    cons: (left, right) => {
        return (pattern) => {
            return pattern.cons(left, right);
        };
    },
    right: (tuple) => {
        return pair.match(tuple, {
            cons: (left, right) => {
                return right;
            }
        });
    },
    left: (tuple) => {
        return pair.match(tuple, {
            cons: (left, right) => {
                return left;
            }
        });
    }
};

describe('EITHER', function() {
    var EITHER = {
        left: (error) => {
            return pair.cons(error, null);
        },
        right: (value) => {
            return pair.cons(null, value);
        },
        unit: (value) => {
            return EITHER.right(value);
        },
        // either#flatMap
        flatMap: (instance) => {
            return (transform) => {
                if(pair.right(instance)){
                    return transform(pair.right(instance));
                } else {
                    return instance;
                }
            };
        },
        // either#map
        map: (instance) => {
            return (transform) => {
                if(pair.right(instance)){
                    return EITHER.right(transform(pair.right(instance)));
                } else {
                    return instance;
                }
            };
        }
    };
    it('EITHER#unit', (next) =>  {
        expect(pair.right(EITHER.unit(1))).to.eql(
                 1
                    );
        next();
    });
    it('EITHER#flatMap', (next) =>  {
        expect(
            pair.right(EITHER.flatMap(EITHER.unit(1))((n) => {
                return EITHER.unit(n+1); 
            }))).to.eql(
                2
                );
        expect(
            pair.right(EITHER.flatMap(EITHER.unit(1))((n) => {
                return EITHER.flatMap(EITHER.unit(n+1))((m) => {
                    return EITHER.unit(m+1); 
                })
            }))).to.eql(
        3
        );
            next();
    });
});
