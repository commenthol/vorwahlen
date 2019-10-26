'use strict'

/* global describe, it */

var
  assert = require('assert')
var vorwahlen = require('../vorwahlen')

describe('#vorwahlen international numbers', function () {
  it('+1206123456789', function () {
    var
      exp = {
        match: ['+1', '206', '123456789'],
        type: 'fixed',
        cc: '1',
        ndc: '206',
        nn: '123456789',
        formatted: '+1 206 1234 567 89'
      }
    var res
    res = vorwahlen('+1206123456789')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('206123456789', function () {
    var
      exp = {
        match: ['', '206', '123456789'],
        type: 'fixed',
        cc: '1',
        ndc: '206',
        nn: '123456789',
        formatted: '206 1234 567 89'
      }
    var res = vorwahlen('206123456789', {
      countryCode: '1'
    })
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('+8835110123456789', function () {
    var
      exp = {
        match: ['+', '8835110', '123456789'],
        type: 'international',
        cc: '8835110',
        formatted: '+8835110 1234 567 89'
      }
    var res = vorwahlen('+8835110123456789')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('+969123456789 no CC exists', function () {
    var
      exp = {
        match: null
      }
    var res = vorwahlen('+969123456789')
    assert.deepStrictEqual(res, exp)
  })
})

describe('#vorwahlen local mobile numbers', function () {
  it('0176', function () {
    var
      exp = {
        type: 'mobile',
        match: ['0', '176', ''],
        cc: '49',
        ndc: '176',
        nn: '',
        formatted: '0176'
      }
    var res = vorwahlen('0176')
    delete res.match.groups
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('01761', function () {
    var
      exp = {
        type: 'mobile',
        match: ['0', '176', '1'],
        cc: '49',
        ndc: '176',
        nn: '1',
        formatted: '0176 1'
      }
    var res = vorwahlen('01761')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('017612', function () {
    var
      exp = {
        type: 'mobile',
        match: ['0', '176', '12'],
        cc: '49',
        ndc: '176',
        nn: '12',
        formatted: '0176 12'
      }
    var res = vorwahlen('017612')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('0176123', function () {
    var
      exp = {
        type: 'mobile',
        match: ['0', '176', '123'],
        cc: '49',
        ndc: '176',
        nn: '123',
        formatted: '0176 123'
      }
    var res = vorwahlen('0176123')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('01761234', function () {
    var
      exp = {
        type: 'mobile',
        match: ['0', '176', '1234'],
        cc: '49',
        ndc: '176',
        nn: '1234',
        formatted: '0176 1234'
      }
    var res = vorwahlen('01761234')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('017612345', function () {
    var
      exp = {
        type: 'mobile',
        match: ['0', '176', '12345'],
        cc: '49',
        ndc: '176',
        nn: '12345',
        formatted: '0176 123 45'
      }
    var res = vorwahlen('017612345')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('0176123456', function () {
    var
      exp = {
        type: 'mobile',
        match: ['0', '176', '123456'],
        cc: '49',
        ndc: '176',
        nn: '123456',
        formatted: '0176 123 456'
      }
    var res = vorwahlen('0176123456')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('01761234567', function () {
    var
      exp = {
        type: 'mobile',
        match: ['0', '176', '1234567'],
        cc: '49',
        ndc: '176',
        nn: '1234567',
        formatted: '0176 1234 567'
      }
    var res = vorwahlen('01761234567')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('017612345678', function () {
    var
      exp = {
        type: 'mobile',
        match: ['0', '176', '12345678'],
        cc: '49',
        ndc: '176',
        nn: '12345678',
        formatted: '0176 1234 5678'
      }
    var res = vorwahlen('017612345678')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('0176123456789', function () {
    var
      exp = {
        type: 'mobile',
        match: ['0', '176', '123456789'],
        cc: '49',
        ndc: '176',
        nn: '123456789',
        formatted: '0176 1234 567 89'
      }
    var res = vorwahlen('0176123456789')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('01761234567890', function () {
    var
      exp = {
        type: 'mobile',
        match: ['0', '176', '1234567890'],
        cc: '49',
        ndc: '176',
        nn: '1234567890',
        formatted: '0176 1234 567 890'
      }
    var res = vorwahlen('01761234567890')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('017612345678901', function () {
    var
      exp = {
        type: 'mobile',
        match: ['0', '176', '12345678901'],
        cc: '49',
        ndc: '176',
        nn: '12345678901',
        formatted: '0176 1234 5678 901'
      }
    var res = vorwahlen('017612345678901')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('0176123456789012', function () {
    var
      exp = {
        type: 'mobile',
        match: ['0', '176', '123456789012'],
        cc: '49',
        ndc: '176',
        nn: '123456789012',
        formatted: '0176 1234 5678 9012'
      }
    var res = vorwahlen('0176123456789012')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('01761234567890123', function () {
    var
      exp = {
        type: 'mobile',
        match: ['0', '176', '1234567890123'],
        cc: '49',
        ndc: '176',
        nn: '1234567890123',
        formatted: '0176 1234 5678 901 23'
      }
    var res = vorwahlen('01761234567890123')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('01531912345', function () {
    var
      exp = {
        match: ['0', '15319', '12345'],
        type: 'mobile',
        cc: '49',
        ndc: '15319',
        nn: '12345',
        formatted: '015319 123 45'
      }
    var res = vorwahlen('01531912345')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
})

describe('#vorwahlen mobile numbers', function () {
  it('+49176123456789', function () {
    var
      exp = {
        type: 'mobile',
        match: ['+49', '176', '123456789'],
        cc: '49',
        ndc: '176',
        nn: '123456789',
        formatted: '0176 1234 567 89'
      }
    var res = vorwahlen('+49176123456789')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('0049176123456789', function () {
    var
      exp = {
        type: 'mobile',
        match: ['0049', '176', '123456789'],
        cc: '49',
        ndc: '176',
        nn: '123456789',
        formatted: '0176 1234 567 89'
      }
    var res = vorwahlen('0049176123456789')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('0049(0)176123456789', function () {
    var
      exp = {
        type: 'mobile',
        match: ['0049', '176', '123456789'],
        cc: '49',
        ndc: '176',
        nn: '123456789',
        formatted: '0176 1234 567 89'
      }
    var res = vorwahlen('0049(0)176123456789')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('(0)176123456789', function () {
    var
      exp = {
        type: 'mobile',
        match: ['0', '176', '123456789'],
        cc: '49',
        ndc: '176',
        nn: '123456789',
        formatted: '0176 1234 567 89'
      }
    var res = vorwahlen('(0)176123456789')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('+4915081123456789 no NDC exists', function () {
    var
      exp = {
        match: null,
        type: 'international',
        cc: '49'
      }
    var res = vorwahlen('+4915081123456789')
    assert.deepStrictEqual(res, exp)
  })
})

describe('#vorwahlen fixed numbers', function () {
  it('+4930123456789', function () {
    var
      exp = {
        type: 'fixed',
        match: ['+49', '30', '123456789'],
        cc: '49',
        ndc: '30',
        nn: '123456789',
        formatted: '030 1234 567 89'
      }
    var res = vorwahlen('+4930123456789')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('004933922123456789', function () {
    var
      exp = {
        type: 'fixed',
        match: ['0049', '33922', '123456789'],
        cc: '49',
        ndc: '33922',
        nn: '123456789',
        formatted: '033922 1234 567 89'
      }
    var res = vorwahlen('004933922123456789')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('0049(0)34261123456789', function () {
    var
      exp = {
        type: 'fixed',
        match: ['0049', '34261', '123456789'],
        cc: '49',
        ndc: '34261',
        nn: '123456789',
        formatted: '034261 1234 567 89'
      }
    var res = vorwahlen('0049(0)34261123456789')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('(0)33922123456789', function () {
    var
      exp = {
        type: 'fixed',
        match: ['0', '33922', '123456789'],
        cc: '49',
        ndc: '33922',
        nn: '123456789',
        formatted: '033922 1234 567 89'
      }
    var res = vorwahlen('(0)33922123456789')
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('034209123456789 no NDC exists', function () {
    var
      exp = {
        match: null
      }
    var res = vorwahlen('034209123456789')
    assert.deepStrictEqual(res, exp)
  })
})

describe('#vorwahlen formating numbers', function () {
  it('+4930123456789', function () {
    var
      exp = {
        type: 'fixed',
        match: ['+49', '30', '123456789'],
        cc: '49',
        ndc: '30',
        nn: '123456789',
        formatted: '+49 30 1234 567 89'
      }
    var res = vorwahlen('+4930123456789', {
      format: {
        national: false
      }
    })
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('+4833922123456789', function () {
    var
      exp = {
        match: ['+', '48', '33922123456789'],
        type: 'international',
        cc: '48',
        formatted: '+48/3392-2123-456-789'
      }
    var res = vorwahlen('+4833922123456789', {
      format: {
        cc: '/',
        ndc: ' ',
        nn: '-'
      }
    })
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('+4933922123456789', function () {
    var
      exp = {
        match: ['+49', '33922', '123456789'],
        type: 'fixed',
        cc: '49',
        ndc: '33922',
        nn: '123456789',
        formatted: '+49/33922/1234-567-89'
      }
    var res = vorwahlen('+4933922123456789', {
      format: {
        national: false,
        cc: '/',
        ndc: '/',
        nn: '-'
      }
    })
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
})

describe('#vorwahlen french numbers', function () {
  it('+331123456789', function () {
    var
      exp = {
        match: ['+33', '1', '123456789'],
        type: 'fixed',
        cc: '33',
        ndc: '1',
        nn: '123456789',
        formatted: '+33 1 1234 567 89'
      }
    var res = vorwahlen('+331123456789', {
      format: {
        national: false
      }
    })
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('+336123456789', function () {
    var
      exp = {
        match: ['+33', '6', '123456789'],
        type: 'mobile',
        cc: '33',
        ndc: '6',
        nn: '123456789',
        formatted: '+33 6 1234 567 89'
      }
    var res = vorwahlen('+336123456789', {
      format: {
        national: false
      }
    })
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('097123456789', function () {
    var
      exp = {
        match: ['0', '97', '123456789'],
        type: 'mobile',
        cc: '33',
        ndc: '97',
        nn: '123456789',
        formatted: '+33 97 1234 567 89'
      }
    var res = vorwahlen('097123456789', {
      countryCode: '33',
      format: {
        national: false
      }
    })
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('085123456789', function () {
    var
      exp = {
        match: ['0', '8', '5123456789'],
        type: 'special',
        cc: '33',
        ndc: '8',
        nn: '5123456789',
        formatted: '+33 8 5123 456 789'
      }
    var res = vorwahlen('085123456789', {
      countryCode: '33',
      format: {
        national: false
      }
    })
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
})

describe('#vorwahlen swiss numbers', function () {
  it('+41328421234', function () {
    var
      exp = {
        match: ['+41', '32842', '1234'],
        type: 'fixed',
        cc: '41',
        ndc: '32842',
        nn: '1234',
        formatted: '+41 32842 1234'
      }
    var res = vorwahlen('+41328421234', {
      format: {
        national: false
      }
    })
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('+41328371234 number not exists', function () {
    var
      exp = {
        match: null,
        type: 'international',
        cc: '41'
      }
    var res = vorwahlen('+41328371234', {
      format: {
        national: false
      }
    })
    assert.deepStrictEqual(res, exp)
  })
  it('0740301234', function () {
    var
      exp = {
        match: ['0', '74030', '1234'],
        type: 'mobile',
        cc: '41',
        ndc: '74030',
        nn: '1234',
        formatted: '+41 74030 1234'
      }
    var res = vorwahlen('0740301234', {
      countryCode: '41',
      format: {
        national: false
      }
    })
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('0740311234 number not exists', function () {
    var
      exp = {
        match: null
      }
    var res = vorwahlen('0740311234', {
      countryCode: '41',
      format: {
        national: false
      }
    })
    assert.deepStrictEqual(res, exp)
  })
  it('1811', function () {
    var
      exp = {
        match: ['', '1811', ''],
        type: 'special',
        cc: '41',
        ndc: '1811',
        nn: '',
        formatted: '1811'
      }
    var res = vorwahlen('1811', {
      countryCode: '41'
    })
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
})

describe('#vorwahlen austrian numbers', function () {
  it('+4321601234', function () {
    var
      exp = {
        match: ['+43', '2160', '1234'],
        type: 'fixed',
        cc: '43',
        ndc: '2160',
        nn: '1234',
        formatted: '+43 2160 1234'
      }
    var res = vorwahlen('+4321601234', {
      format: {
        national: false
      }
    })
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('+4321611234 number not exists', function () {
    var
      exp = {
        match: null,
        type: 'international',
        cc: '43'
      }
    var res = vorwahlen('+4321611234', {
      format: {
        national: false
      }
    })
    assert.deepStrictEqual(res, exp)
  })
  it('06551234567', function () {
    var
      exp = {
        match: ['0', '655', '1234567'],
        type: 'mobile',
        cc: '43',
        ndc: '655',
        nn: '1234567',
        formatted: '+43 655 1234 567'
      }
    var res = vorwahlen('06551234567', {
      countryCode: '43',
      format: {
        national: false
      }
    })
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('06911234567 number not exists', function () {
    var
      exp = {
        match: null
      }
    var res = vorwahlen('06911234567', {
      countryCode: '43',
      format: {
        national: false
      }
    })
    assert.deepStrictEqual(res, exp)
  })
  it('0939123456', function () {
    var
      exp = {
        match: ['0', '939', '123456'],
        type: 'special',
        cc: '43',
        ndc: '939',
        nn: '123456',
        formatted: '0939 123 456'
      }
    var res = vorwahlen('0939123456', {
      countryCode: '43'
    })
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
})

describe('#vorwahlen uk numbers', function () {
  it('+44118123456', function () {
    var
      exp = {
        match: ['+44', '118', '123456'],
        type: 'fixed',
        cc: '44',
        ndc: '118',
        nn: '123456',
        formatted: '+44 118 123 456'
      }
    var res = vorwahlen('+44118123456', {
      format: {
        national: false
      }
    })
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('+44122911234 number not exists', function () {
    var
      exp = {
        match: null,
        type: 'international',
        cc: '44'
      }
    var res = vorwahlen('+44122911234', {
      format: {
        national: false
      }
    })
    assert.deepStrictEqual(res, exp)
  })
  it('07571234567', function () {
    var
      exp = {
        match: ['0', '7571', '234567'],
        type: 'mobile',
        cc: '44',
        ndc: '7571',
        nn: '234567',
        formatted: '+44 7571 234 567'
      }
    var res = vorwahlen('07571234567', {
      countryCode: '44',
      format: {
        national: false
      }
    })
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('076231234567 number is special number', function () {
    var
      exp = {
        match: ['0', '7623', '1234567'],
        type: 'special',
        cc: '44',
        ndc: '7623',
        nn: '1234567',
        formatted: '+44 7623 1234 567'
      }
    var res = vorwahlen('076231234567', {
      countryCode: '44',
      format: {
        national: false
      }
    })
    delete res.match.groups
    assert.deepStrictEqual(res, exp)
  })
  it('0939123456 number does not exist', function () {
    var
      exp = {
        match: null
      }
    var res = vorwahlen('0939123456', {
      countryCode: '44'
    })
    assert.deepStrictEqual(res, exp)
  })
})
