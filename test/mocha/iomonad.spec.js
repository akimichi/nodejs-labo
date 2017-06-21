"use strict";

var expect = require('expect.js');
var sys = require('sys');
var fs = require('fs');

var not = (predicate) => {
  return (arg) => {
    return ! predicate(arg);
  };
};

var compose = (f,g) => {
  return (arg) => {
    return f(g(arg));
  };
};

var string = {
  head: (str) => {
    return str[0];
  },
  tail: (str) => {
    return str.substring(1);
  },
  isEmpty: (str) => {
    return str.length === 0;
  },
  toArray: (str) => {
    var glue = (item) => {
      return (rest) => {
        return [item].concat(rest);
      };
    };
    if(string.isEmpty(str)) {
      return [];
    } else {
      return [string.head(str)].concat(string.toArray(string.tail(str)));
    }
  }
};

var pair = {
  empty: (_) => {
    return (pattern) => {
      return pattern.empty();
    };
  },
  cons: (left, right) => {
    return (pattern) => {
      return pattern.cons(left, right);
    };
  },
  match : (data, pattern) => {
    return data.call(pair, pattern);
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



var list  = {
  match : (data, pattern) => {
    return data.call(list, pattern);
  },
  empty: (_) => {
    return (pattern) => {
      return pattern.empty();
    };
  },
  cons: (value, alist) => {
    return (pattern) => {
      return pattern.cons(value, alist);
    };
  },
  head: (alist) => {
    return list.match(alist, {
      empty: (_) => {
        return null;
      },
      cons: (head, tail) => {
        return head;
      }
    });
  },
  tail: (alist) => {
    return list.match(alist, {
      empty: (_) => {
        return null;
      },
      cons: (head, tail) => {
        return tail;
      }
    });
  },
  isEmpty: (alist) => {
    return list.match(alist, {
      empty: (_) => {
        return true;
      },
      cons: (head, tail) => {
        return false;
      }
    });
  },
  // append:: LIST[T] -> LIST[T] -> LIST[T]
  // append [] ys = ys
  // append (x:xs) ys = x : (xs ++ ys)
  append: (xs) => {
    return (ys) => {
      return list.match(xs, {
        empty: (_) => {
          return ys;
        },
        cons: (head, tail) => {
          return list.cons(head, list.append(tail)(ys)); 
        }
      });
    };
  },
  // list#concat
  // concat:: LIST[LIST[T]] -> LIST[T]
  // concat [] = []
  // concat (xs:xss) = append(xs, xss)
  // or,
  // concat xss = foldr xss [] append
  concat: (xss) => {
    return list.match(xss,{
      empty: (_) => {
        return list.empty();
      },
      cons: (xs,xss) => {
        return list.append(xs,xss);
      }
    });
    // return list.foldr(list_of_list)(list.empty())(list.append);
  },
  last: (alist) => {
    return list.match(alist, {
      empty: (_) => {
        return null;
      },
      cons: (head, tail) => {
        return list.match(tail, {
          empty: (_) => {
            return head;
          },
          cons: (head, _) => {
            return list.last(tail);
          }
        });
      }
    });
  },
  // join:: LIST[LIST[T]] -> LIST[T]
  join: (list_of_list) => {
    return list.concat(list_of_list);
  },
  // foldr:: LIST[T] -> T -> FUNC[T -> LIST] -> T
  foldr: (alist) => {
    return (accumulator) => {
      return (glue) => {
        return list.match(alist,{
          empty: (_) => {
            return accumulator;
          },
          cons: (head, tail) => {
            return glue(head)(list.foldr(tail)(accumulator)(glue));
          }
        });
      };
    };
  },
  // map:: LIST[T] -> FUNC[T -> T] -> LIST[T]
  map: (alist) => {
    return (transform) => {
      return list.match(alist,{
        empty: (_) => {
          return list.empty();
        },
        cons: (head,tail) => {
          return list.cons(transform(head),list.map(tail)(transform));
        }
      });
    };
  },
  /* #@range_begin(list_reverse) */
  reverse: (alist) => {
    var reverseAux = (alist, accumulator) => {
      return list.match(alist, {
        empty: (_) => {
          return accumulator;  // 空のリストの場合は終了
        },
        cons: (head, tail) => {
          return reverseAux(tail, list.cons(head, accumulator));
        }
      });
    };
    return reverseAux(alist, list.empty());
  },
  /* #@range_end(list_reverse) */
  // ## list.filter
  /* #@range_begin(list_filter) */
  filter: (alist) => {
    return (predicate) => {
      return list.match(alist,{
        empty: (_) => {
          return list.empty();
        },
        cons: (head,tail) => {
          if(predicate(head)){
            return list.cons(head,list.filter(tail)(predicate));
          } else {
            return list.filter(tail)(predicate);
          }
        }
      });
    };
  },
  take: (alist) => {
    return (n) => {
      if (n === 0) {
        return list.empty();
      } else {
        return list.cons(list.head,list.take(list.tail)(n-1));
      }
    };
  },
  drop: (alist) => {
    return (n) => {
      if (n === 0) {
        return alist;
      } else if(n === 1) {
        return list.tail(alist);
      } else {
        return list.drop(list.tail)(n-1);
      }
    };
  },
  takeWhile: (alist) => {
    return (predicate) => {
      return list.match(alist,{
        empty: (_) => {
          return list.empty();
        },
        cons: (head,tail) => {
          if(predicate(head) === true) {
            return list.cons(head, list.takeWhile(tail)(predicate));
          } else {
            return list.empty();
          }
        }
      });
    };
  },
  dropWhile: (alist) => {
    return (predicate) => {
      return list.match(alist,{
        empty: (_) => {
          return list.empty(); 
        },
        cons: (head,tail) => {
          if(predicate(head) === true) {
            return list.dropWhile(tail)(predicate);
          } else {
            return alist;
          }
        }
      });
    };
  },
  splitAt: (alist) => {
    return (n) => {
      return pair.cons(list.take(alist)(n), list.drop(alist)(n));
    };
  },
  span: (alist) => {
    return (predicate) => {
      return list.match(alist,{
        empty: (_) => {
          return pair.empty(); 
        },
        cons: (head,tail) => {
          return pair.cons(list.takeWhile(alist)(predicate), list.dropWhile(alist)(predicate));
        }
      });
    };
  },
  break: (alist) => {
    return (predicate) => {
      return list.span(alist)(not(predicate));
    };
  },
  lines: (xs) => {
    var isNewline = (ch) => {
      return ch === '\n';
    };
    var apair = list.break(xs)(isNewline);
    return pair.match(apair,{
      cons: (ys,zs) => {
        return list.match(zs, {
          empty: (_) => {
            return list.cons(ys,list.empty());
          },
          cons: (head, tail) => {
            return list.cons(ys, list.lines(tail));
          }
        });
      }
    });
  },
  // list#length
  length: (alist) => {
    return list.match(alist,{
      empty: (_) => {
        return 0;
      },
      cons: (head,tail) => {
        return list.foldr(alist)(0)((item) => {
          return (accumulator) => {
            return 1 + accumulator;
          };
        });
      }
    });
  },
  /* #@range_end(list_filter) */
  toArray: (alist) => {
    var toArrayAux = (alist,accumulator) => {
      return list.match(alist, {
        empty: (_) => {
          return accumulator;  // 空のリストの場合は終了
        },
        cons: (head, tail) => {
          return toArrayAux(tail, accumulator.concat(head));
        }
      });
    };
    return toArrayAux(alist, []);
  },
  fromArray: (array) => {
    return array.reduce((accumulator, item) => {
      return list.append(accumulator)(list.cons(item, list.empty()));
    }, list.empty());
  },
  fromString: (str) => {
    if(string.isEmpty(str)) {
      return list.empty();
    } else {
      return list.cons(string.head(str), 
                       list.fromString(string.tail(str)));
    }
  }
};


var IO = {
  match: (data, pattern) => {
    return data.call(pattern, pattern);
  },
  // unit:: T => IO[T]
  unit : (any) => {
    return (_) =>  { // 外界は明示する必要はありません
      return any;
    };
  },
  // flatMap:: IO[T] => FUN[T => IO[U]] => IO[U]
  flatMap: (instanceA) => {
    return (actionAB) => { // actionAB:: a -> IO b
      return () => IO.run(actionAB(IO.run(instanceA)))
    };
  },
  // flatMap : (instanceA) => {
  //   return (actionAB) => { // actionAB:: a -> IO[b]
  //     // return (_) => {
  //     //   return IO.run(actionAB(IO.run(instanceA)));
  //     // };
  //     return IO.unit(IO.run(actionAB(IO.run(instanceA))));
  //   };
  // },
  // done:: T => IO[T]
  done : (any) => {
    return IO.unit();
  },
  // run:: IO[A] => A
  run : (instance) => {
    return instance();
  },
  // readFile:: STRING => IO[STRING]
  readFile : (path) => {
    return (_) => {
      var fs = require('fs');
      var content = fs.readFileSync(path, 'utf8');
      return IO.unit(content)();
    };
  },
  // println:: STRING => IO[null]
  println : (message) => {
    return (_) => {
      console.log(message);
      return IO.unit(null)();
    };
  },
  writeFile : (path) => {
    return (content) => {
      return (_) => {
        var fs = require('fs');
        fs.writeFileSync(path,content);
        return IO.unit(null)();
      };
    };
  },
  
  // IO.seq:: IO[a] => IO[b] => IO[b]
  seq: (instanceA) => {
    return (instanceB) => {
      return IO.flatMap(instanceA)((a) => {
        return instanceB;
      });
    };
  },
  seqs: (alist) => {
    return list.foldr(alist)(list.empty())(IO.done());
  },
  // IO.putc:: CHAR => IO[]
  putc: (character) => {
    return (io) => {
      process.stdout.write(character);
      return null;
    };
  },
  // IO.puts:: LIST[CHAR] => IO[]
  puts: (alist) => {
    return match(alist, {
      empty: () => {
        return IO.done();
      },
      cons: (head, tail) => {
        return IO.seq(IO.putc(head))(IO.puts(tail));
      }
    });
  },
  // IO.putChar関数は、一文字を出力する 
  // IO.putChar:: CHAR => IO[]
  putChar: (character) => {
    return  () => {
      process.stdout.write(character); 
      return null;
    };
  },
  // putChar: (character) => {
  //   process.stdout.write(character); // 1文字だけ画面に出力する
  //   return IO.unit(null);
  // },
  // IO.putStr関数は、文字のリストを連続して出力する 
  // IO.putStr:: LIST[CHAR] => IO[]
  putStr: (alist) => {
    return list.match(alist, {
      empty: () => {
        return IO.done();
      },
      cons: (head, tail) => {
        return IO.seq(IO.putChar(head))(IO.putStr(tail));
      }
    });
  },
  // IO.putStrLn関数は、文字列を出力し、最後に改行を出力する
  // IO.putStrLn:: LIST[CHAR] => IO[]
  putStrLn:(alist) => {
    return IO.seq(IO.putStr(alist))(IO.putChar("\n"));
  },
  // IO.getc :: IO[CHAR]
  getc: () => {
    var continuation = () => {
      var chunk = process.stdin.read();
      return chunk;
    }; 
    process.stdin.setEncoding('utf8');
    return process.stdin.on('readable', continuation);
  }
}; // IO monad

describe('IO', () =>  {
  it('IO.println', (next) => {
    expect(
      IO.run(IO.println("this is another test")) // 外界を指定する必要はありません
    ).to.eql(
      null
    );
    next();
  });
  it('IOモナドは合成可能である', (next) => {
    const ab = IO.flatMap(IO.putChar('a'))(() =>
      IO.flatMap(IO.putChar('b'))(() =>
        IO.done()
      )
    );  
    IO.run(ab);
    next();
  });
  it('IOモナドで参照透過性を確保する', (next) => {
    expect(
      IO.flatMap(IO.readFile("./test/resources/file.txt"))((content) => {
        return IO.flatMap(IO.println(content))((_) => {
          return IO.done(_);
        });
      })()
    ).to.eql(
      IO.flatMap(IO.readFile("./test/resources/file.txt"))((content) => {
        return IO.flatMap(IO.println(content))((_) => {
          return IO.done(_);
        });
      })()
    );
    next();
  });
});

describe('string module', () => {
  it('string#head', (next) => {
    expect(
      string.head("abc")
    ).to.eql(
      "a"
    );
    expect(
      string.head("あいう")
    ).to.eql(
      "あ"
    );
    next();
  });
  it('string#tail', (next) => {
    expect(
      string.tail("abc")
    ).to.eql(
      "bc"
    );
    expect(
      string.tail("あいう")
    ).to.eql(
      "いう"
    );
    next();
  });
  it('string#isEmpty', (next) => {
    expect(
      string.isEmpty("abc")
    ).to.eql(
      false 
    );
    expect(
      string.isEmpty("")
    ).to.eql(
      true
    );
    next();
  });
});

describe('list module', () => {
  it('list#fromString', (next) => {
    expect(
      list.toArray(list.fromString("abc"))
    ).to.eql(
      ['a', 'b', 'c'] 
    );
    expect(
      list.toArray(list.fromString("あいう"))
    ).to.eql(
      ['あ', 'い', 'う'] 
    );
    expect(
      list.toArray(list.fromString("\n"))
    ).to.eql(
      ['\n'] 
    );
    expect(
      list.toArray(list.fromString("abc\n"))
    ).to.eql(
      ['a', 'b', 'c','\n'] 
    );
    next();
  });
  it('list#takeWhile', (next) => {
    var alist = list.fromString("123"); 
    var even = (n) => {
      return 0 === (n % 2);
    };
    var odd = not(even);
    expect(
      list.head(list.takeWhile(alist)(odd))
    ).to.eql(
      '1'
    );
    next();
  });
  it('list#dropWhile', (next) => {
    var alist = list.fromString("123"); 
    var even = (n) => {
      return 0 === (n % 2);
    };
    var odd = not(even);
    expect(
      list.toArray(list.dropWhile(alist)(odd))
    ).to.eql(
      ['2','3']
    );
    next();
  });
  it('list#span', (next) => {
    var alist = list.fromString("123"); 
    var even = (n) => {
      return 0 === (n % 2);
    };
    var odd = not(even);
    pair.match(list.span(alist)(odd),{
      empty: (_) => {
        expect().fail();
      },
      cons: (left, right) => {
        expect(
         list.toArray(left)
       ).to.eql(['1']);
        expect(
         list.toArray(right)
       ).to.eql(['2','3']);
      }
    });
    next();
  });
  it('list#break', (next) => {
    var broken = list.break(list.fromString("abc"))((item) => {
      return item === "b";
    });
    list.match(broken,{
      empty: (_) => {
        expect().fail();
      },
      cons: (left,right) => {
        expect(
         list.toArray(left)
       ).to.eql(['a']);
      }
    });
    next();
  });
  it('list#lines', (next) => {
    var lines = list.lines(list.fromString("abc\ndef"));
    list.match(lines,{
      empty: (_) => {
        expect().fail();
      },
      cons: (head,tail) => {
        expect(
         list.toArray(head)
       ).to.eql(['a','b','c']);
        expect(
         list.toArray(list.head(tail))
       ).to.eql(['d','e','f']);
      }
    });
    next();
  });
});
describe('readFileSync', () =>  {
   IO.flatMap(IO.readFile("./test/resources/draft.re"))((content) => {
    var string_as_list = list.fromString(content); // 文字列を文字のリストに変換しておく
    // var lines = 
    return IO.flatMap(IO.putStrLn(string_as_list))((_) => {
      return IO.done(_);
    });
  });
});
