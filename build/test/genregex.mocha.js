/* eslint-disable node/no-path-concat */
'use strict'

/* global describe, it */

const assert = require('assert')
const gen = require('../lib/genregex')

// test the regex with the given numbers
function test (regex, numbers, exeptions) {
  const append = '8888'
  const rex = new RegExp('^(' + regex + ')(.*)$')

  exeptions = exeptions || {}

  numbers.forEach(function (n) {
    n = n.replace(/x/g, '0')
    const n1 = n + append
    const res = n1.match(rex)

    // ~ if (res[1] !== n || res[2] !== append) {
    // ~ console.error(n, res);
    // ~ res = false;
    // ~ }

    assert.strictEqual(rex.test(n), true, 'number is ' + n)

    if (!exeptions[n]) {
      assert.strictEqual(res[1], n, res[1] + '; number is ' + n)
      assert.strictEqual(res[2], append, res[2] + '; number is ' + n)
    }
  })
}

describe('generate regex', function () {
  it('build regexp', function () {
    const numbers = gen.readnumbers([`${__dirname}/test.txt`])
    const res = gen.buildRegex(numbers)
    const exp = '(?:1(?:5(?:90|9))|2(?:0(?:1|2|3|4[135]|5[1-468]|6[456]|8|9)|1(?:29|1|2))|9(?:0[236-8]|1|2[0-6]))'

    // ~ console.log(JSON.stringify(gen._buildHash(numbers), null, '  '));
    assert.strictEqual(res, exp)
    test(res, numbers)
  })

  it('build regexp with x', function () {
    const numbers = gen.readnumbers([`${__dirname}/test1.txt`])
    const res = gen.buildRegex(numbers)
    const exp = '(?:2(?:2\\d|3(?:\\d\\d)|4[1]))'

    assert.strictEqual(res, exp)
    test(res, numbers)
  })

  it('build regex from de_mobile', function () {
    const numbers = gen.readnumbers([`${__dirname}/../../assets/49_mobile.txt`])
    const res = gen.buildRegex(numbers)

    test(res, numbers, { 157: 1 })
  })

  it('build regex from de_fixed', function () {
    const numbers = gen.readnumbers([`${__dirname}/../../assets/49_fixed.txt`])
    const res = gen.buildRegex(numbers)

    test(res, numbers)
  })
})
