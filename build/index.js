'use strict';

/**
 * file to build all regular expressions for prefix dialing
 */

var
  fs = require('fs'),
  assert = require('assert'),
  gen = require('./lib/genregex');

var
  config = {
    out: __dirname + '/out.txt'
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
      numbers,
      regex;
    
    numbers = gen.readnumbers([__dirname + '/../assets/' + f + '.txt']);
    regex = gen.buildRegex(numbers);
    regex = regex.replace(/^\(\?:/, '(');

    // test the generated regex
    if(test(regex, numbers)) {
      result[f] = regex;
    }
    else {
      console.error(f + ' contains errors');
    }
  });
  return result;
}

var res = build([ 'international', 'de_mobile', 'de_fixed' ]);

fs.writeFileSync(config.out, JSON.stringify(res, null, '\t'), 'utf8');

console.log('done ...\n  file ' + config.out + ' written');
