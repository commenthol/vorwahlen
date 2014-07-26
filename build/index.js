'use strict';

/**
 * file to build all regular expressions for prefix dialing
 */

var
  fs = require('fs'),
  assert = require('assert'),
  hashTree = require('hashtree').hashTree,
  gen = require('./lib/genregex');

var
  config = {
    out: __dirname + '/out.json'
  };

// test the regex with the given numbers
function test (regex, numbers) {
  var
    append = '8888',
    res = true,
    rex = new RegExp('^' + regex + '(.*)$');

  numbers.forEach(function(n){
    var
      n1 = n + append,
      res = n1.match(rex);

    if (res[1] !== n || res[2] !== append) {
      console.error(n, res);
      res = false;
    }
  });
  
  return res;
}

// build the regexes
function build (files) {
  var
    result = {};

  files.forEach(function(f){
    var
      a = f.split('_'),
      numbers,
      regex;

    numbers = gen.readnumbers([__dirname + '/../assets/' + f + '.txt']);
    regex = gen.buildRegex(numbers);
    regex = regex.replace(/^\(\?:/, '(');

    hashTree.set(result, a, regex);

    // test the generated regex
    if(! test(regex, numbers)) {
      console.log(f + ' contains errors');
    }
  });
  return result;
}

var res = build([
  'international',
  '49_special', '49_mobile','49_fixed',
  '43_special', '43_mobile','43_fixed',
  '41_special', '41_mobile','41_fixed',
  '1_special', '1_mobile', '1_fixed'
  ]);

fs.writeFileSync(config.out, JSON.stringify(res, null, '\t'), 'utf8');

console.log('done ...\n  file ' + config.out + ' written');
