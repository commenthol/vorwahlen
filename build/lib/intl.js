/* eslint-disable node/no-path-concat */
'use strict'

const
  _ = require('lodash')
const fs = require('fs')

const
  config = {
    in: `${__dirname}/../../attic/itu-international.txt`,
    out: `${__dirname}/../../assets/international_cc.txt`
  }
let numbers = []
const intl = fs.readFileSync(config.in, 'utf8')

intl.replace(/\((\+[^)]+)\)/mg, function (m, number) {
  number = number.replace(/[^0-9,]/g, '')
  const arr = number.split(',')
  arr.forEach(function (i) {
    numbers.push(i)
  })
})

numbers = _.uniq(numbers).sort()

fs.writeFileSync(config.out, numbers.join('\n'), 'utf8')
