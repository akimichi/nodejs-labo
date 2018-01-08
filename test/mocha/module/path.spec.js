"use strict";

var expect = require('expect.js');

describe('path module', function() {
  const path = require('path');

  const filepath = '/home/emile/projects/EHR.node/filename.ext';
  it('Path#basenameでファイル名を取りだす', (next) => {
    expect(
      path.basename(filepath) 
    ).to.eql(
      'filename.ext'
    );
    next();
  });
  it('Path#extnameで拡張子を取りだす', (next) => {
    expect(
      path.extname(filepath) 
    ).to.eql(
      '.ext'
    );
    next();
  });
  it('Path#dirnameでディレクトリを取りだす', (next) => {
    expect(
      path.dirname(filepath) 
    ).to.eql(
      '/home/emile/projects/EHR.node'
    );
    next();
  });

});

