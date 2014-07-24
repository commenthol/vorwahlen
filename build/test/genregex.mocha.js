'use strict';

/* global describe, it */

var
  assert = require('assert'),
  gen = require('../lib/genregex');


describe('generate regex', function(){
  it('build regexp', function(){
    var
      numbers = gen.readnumbers([__dirname + '/test.txt']),
      res = gen.buildRegex(numbers),
      reg,
      exp = '(?:2(?:0(?:1|2|3|4[135]|5[1-468]|6[456]|8|9)|1(?:29|1|2))|9(?:0[236-8]|1|2[0-6]))';

    reg = new RegExp('^('+res+').*$');

    //~ console.log(JSON.stringify(gen._buildHash(numbers), null, '  '));

    assert.equal(res, exp);

    numbers.forEach(function(n){
      assert.equal(reg.test(n), true, 'number is ' + n);
    });

    assert.equal(reg.test('110'), false, 'number 110');
  });

  it('build regex from de_mobile', function(){
    var
      numbers = gen.readnumbers([__dirname + '/../../assets/de_mobile.txt']),
      res = gen.buildRegex(numbers),
      reg;

    reg = new RegExp('^('+res+').*$');

    numbers.forEach(function(n){
      assert.equal(reg.test(n), true, 'number is ' + n);
    });
  });
  
  it('build regex from de_fixed', function(){
    var
      numbers = gen.readnumbers([__dirname + '/../../assets/de_fixed.txt']),
      res = gen.buildRegex(numbers),
      reg;

    reg = new RegExp('^('+res+').*$');

    numbers.forEach(function(n){
      assert.equal(reg.test(n), true, 'number is ' + n);
    });
  });
});
