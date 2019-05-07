'use strict'

var
  _ = require('lodash')
var fs = require('fs')

var
  config = {
    in: `${__dirname}/../../attic/itu-international.txt`,
    out: `${__dirname}/../../assets/international_cc.txt`
  }
var numbers = []
var intl = fs.readFileSync(config.in, 'utf8')

intl.replace(/\((\+[^)]+)\)/mg, function (m, number) {
  var arr

  number = number.replace(/[^0-9,]/g, '')
  arr = number.split(',')
  arr.forEach(function (i) {
    numbers.push(i)
  })
})

numbers = _.uniq(numbers).sort()

fs.writeFileSync(config.out, numbers.join('\n'), 'utf8')
