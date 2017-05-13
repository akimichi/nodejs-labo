"use strict";

const expect = require('expect.js');


describe('Maybe', () => {
    const Maybe = {
        match(data, pattern){
            return data.call(Maybe,pattern);
        },
        just(value){
            return (pattern) => {
                return pattern.just(value);
            };
        },
        nothing(_){
            return (pattern) => {
                return pattern.nothing(_);
            };
        },
        unit(value){
            return Maybe.just(value);
        },
        flatMap(maybeInstance){
            return (transform) => {
                expect(transform).to.a('function');
                return Maybe.match(maybeInstance,{
                    just: (value) => {
                        return transform(value);
                    },
                       nothing: (_) => {
                           return Maybe.nothing(_);
                       }
                });
            };
        },
        get(maybe){
            return Maybe.getOrElse(maybe)(null);
        },
        getOrElse(instance){
            return (alternate) => {
                return Maybe.match(instance,{
                    just: (value) => {
                        return value;
                    },
                nothing: (_) => {
                    return alternate;
                }});
            };
        },
        isEqual(maybeA){
            return (maybeB) => {
                return Maybe.match(maybeA,{
                    just: (valueA) => {
                        return Maybe.match(maybeB,{
                            just: (valueB) => {
                                return (valueA === valueB);
                            },
                            nothing: (_) => {
                                return false;
                            }
                        });
                    },
                    nothing: (_) => {
                        return Maybe.match(maybeB,{
                            just: (_) => {
                                return false;
                            },
                        nothing: (_) => {
                            return true;
                        }});
                    }
                });
            };
        },
        map(maybeInstance){
            return (transform) => {
                expect(transform).to.a('function');
                return Maybe.match(maybeInstance,{
                    just: (value) => {
                        return Maybe.unit(transform(value));
                    },
                    nothing: (_) => {
                        return Maybe.nothing(_);
                    }
                });
            };
        }
    };
    it("Maybe#flatMap", (next) => {
        Maybe.match(Maybe.flatMap(Maybe.just(1))((a) => {
            return Maybe.unit(a);
        }),{
            just: (value) => {
                expect(
                    value
                    ).to.eql(
                        1
                        );
            },
            nothing: (_) => {
                expect().fail();
            }
        });
        Maybe.match(Maybe.flatMap(Maybe.nothing())((a) => {
            return Maybe.unit(a);
        }),{
            just: (value) => {
                expect().fail();
            },
            nothing: (_) => {
                expect(true).to.be.ok();
            }
        });
        next();
    });
    it("add(maybe, maybe)", (next) => {
        var add = (maybeA,maybeB) => {
            return Maybe.flatMap(maybeA)((a) => {
                return Maybe.flatMap(maybeB)((b) => {
                    return Maybe.unit(a + b);
                });
            });
        };
        var justOne = Maybe.just(1);
        var justTwo = Maybe.just(2);
        var justThree = Maybe.just(3);
        expect(
            Maybe.isEqual(add(justOne,justTwo))(justThree)
            ).to.eql(
                true
                );
        expect(
            Maybe.isEqual(add(justOne,Maybe.nothing()))(Maybe.nothing())
            ).to.eql(
                true
                );
        next();
    });
});
