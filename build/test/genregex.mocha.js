'use strict';

/* global describe, it */

var
  assert = require('assert'),
  gen = require('../lib/genregex');


// test the regex with the given numbers
function test (regex, numbers, exeptions) {
  var
    append = '8888',
    res = true,
    rex = new RegExp('^(' + regex + ')(.*)$');

  exeptions = exeptions || {};

  numbers.forEach(function(n){
    var
      n1 = n + append,
      res = n1.match(rex);

    //~ if (res[1] !== n || res[2] !== append) {
      //~ console.error(n, res);
      //~ res = false;
    //~ }

    assert.equal(rex.test(n), true, 'number is ' + n);

    if (! exeptions[n]) {
      assert.equal(res[1], n, res[1] + '; number is ' + n);
      assert.equal(res[2], append, res[2] + '; number is ' + n);
    }
  });
}

describe('generate regex', function(){
  it('build regexp', function(){
    var
      numbers = gen.readnumbers([__dirname + '/test.txt']),
      res = gen.buildRegex(numbers),
      exp = '(?:1(?:5(?:90|9))|2(?:0(?:1|2|3|4[135]|5[1-468]|6[456]|8|9)|1(?:29|1|2))|9(?:0[236-8]|1|2[0-6]))';

    //~ console.log(JSON.stringify(gen._buildHash(numbers), null, '  '));
    assert.equal(res, exp);
    test(res, numbers);
  });

  it('build regex from de_mobile', function(){
    var
      numbers = gen.readnumbers([__dirname + '/../../assets/de_49_mobile.txt']),
      res = gen.buildRegex(numbers);

    test(res, numbers, {157:1});
  });
  
  it('build regex from de_fixed', function(){
    var
      numbers = gen.readnumbers([__dirname + '/../../assets/de_49_fixed.txt']),
      res = gen.buildRegex(numbers);

    test(res, numbers);
  });
});
