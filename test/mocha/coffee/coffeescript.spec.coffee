
expect = require 'expect.js'

describe "値", ->
  it '数値', ->
    expect(1).to.be(1)

describe "if", ->
  it 'even', (next) ->
    even = (n) ->
      if (n % 2) is 0
        true
      else
        false
    expect(even(2)).to.be true
    expect(even(3)).to.be false
    next()
