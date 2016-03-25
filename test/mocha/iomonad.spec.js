"use strict";

var expect = require('expect.js');
var sys = require('sys');
var fs = require('fs');

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
  flatMap : (instanceA) => {
    return (actionAB) => { // actionAB:: a -> IO[b]
      return IO.unit(IO.run(actionAB(IO.run(instanceA))));
    };
  },
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
describe('readFileSync', () =>  {
  var file = fs.readFileSync("test/resources/draft.re", 'utf8');
  IO.flatMap(IO.readFile("./test/resources/file.txt"))((content) => {
    return IO.flatMap(IO.println(content))((_) => {
      return IO.done(_);
    });
  })
});
