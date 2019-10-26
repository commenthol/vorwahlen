'use strict'

/**
 * file to build all regular expressions for prefix dialing
 */

var fs = require('fs')
var hashTree = require('hashtree').hashTree
var gen = require('./lib/genregex')

var config = {
  out: `${__dirname}/../src/`,
  build: {
    international: {
      prefix: '(\\+|00)', // international prefix
      assets: ['international_cc']
    },
    1: {
      national: '', // national prefix
      prefix: '(\\+1|(?:))',
      assets: ['1_special', '1_mobile', '1_fixed']
    },
    41: {
      national: '0', // national prefix
      prefix: '(\\+41|0041|0|(?:))0?',
      assets: ['41_special', '41_mobile', '41_fixed']
    },
    43: {
      national: '0', // national prefix
      prefix: '(\\+43|0043|0|(?:))0?',
      assets: ['43_special', '43_mobile', '43_fixed']
    },
    44: {
      national: '0', // national prefix
      prefix: '(\\+44|0044|0|(?:))0?',
      assets: ['44_special', '44_mobile', '44_fixed']
    },
    49: {
      national: '0', // national prefix
      prefix: '(\\+49|0049|0|(?:))0?',
      assets: ['49_special', '49_mobile', '49_fixed']
    }
  }
}

// test the regex with the given numbers
function test (regex, numbers) {
  var
    append = '8888'
  var res = true
  var rex = new RegExp('^' + regex + '(.*)$')

  numbers.forEach(function (n) {
    var n1, res

    n = n.replace(/x/g, '0')
    n1 = n + append
    res = n1.match(rex)

    if (res[1] !== n || res[2] !== append) {
      console.error(n, res)
      res = false
    }
  })

  return res
}

// build the regexes
function build (obj) {
  var
    result = {}

  obj.assets.forEach(function (f) {
    var
      a = f.split('_')
    var numbers
    var regex;

    ['national', 'prefix'].forEach(function (p) {
      if (obj[p] !== undefined) {
        hashTree.set(result, [a[0], p], obj[p])
      }
    })

    numbers = gen.readnumbers([`${__dirname}/../assets/${f}.txt`])
    regex = gen.buildRegex(numbers)
    regex = regex.replace(/^\(\?:/, '(')

    hashTree.set(result, a, regex)

    // test the generated regex
    if (!test(regex, numbers)) {
      console.log(f + ' contains errors')
    }
  })
  return result
}

function run () {
  var i,
    file,
    res

  for (i in config.build) {
    file = config.out + 'data_' + i + '.js'
    res = build(config.build[i])
    res = 'extend(data, ' + JSON.stringify(res, null, 2) + ');'
    // ~ console.log(res);
    fs.writeFileSync(file, res, 'utf8')
  }
}

module.exports = run

if (require.main === module) {
  run()
  console.log('done ...\n  file ' + config.out + ' written')
}
