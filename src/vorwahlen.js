(function (ctx) {
  'use strict'

  var
    M = {} // define the module
  var country
  var moduleName = 'vorwahlen' // the name of the module
  var config = {
    'countryCode': '49' // the default country code
  }
  var regex = {} // regular expressions to segment phone numbers
  var data = {}

  // eslint-disable-next-line no-unused-vars
  function extend (origin, add) {
    for (var i in add) {
      origin[i] = add[i]
    }
  }

  // @include data_international.js

  // @ifdef 1
  // @include data_1.js
  // @endif

  // @ifdef 33
  // @include data_33.js
  // @endif

  // @ifdef 41
  // @include data_41.js
  // @endif

  // @ifdef 43
  // @include data_43.js
  // @endif

  // @ifdef 44
  // @include data_44.js
  // @endif

  // @ifdef 49
  // @include data_49.js
  // @endif

  // building the regexes using `data`
  regex = {
    international: new RegExp('^' + data.international.prefix + data.international.cc + '(\\d*)$')
  }

  for (country in data) {
    if (/^\d+$/.test(country)) {
      ['special', 'mobile', 'fixed'].forEach(function (type) { // jshint ignore:line
        if (data[country] && data[country][type]) {
          if (!regex[country]) { regex[country] = {} }
          if (!regex[country][type]) { regex[country][type] = {} }
          regex[country][type] = new RegExp('^' + data[country].prefix + data[country][type] + '(\\d*)$')
        }
      }) // jshint ignore:line
    }
  }

  // format the result object `res` according to `options`
  function format (res, options) {
    var
      tmp
    var last
    var size = 4
    var seg = []

    options.format = options.format || {}
    options.format.national = (options.format.national === undefined ? true : options.format.national)
    options.format.cc = options.format.cc || ' '
    options.format.ndc = options.format.ndc || ' '
    options.format.nn = options.format.nn || ' '

    if (res.match) {
      last = res.match[res.match.length - 1]
      while (last.length > 0) {
        if (last.length === 6 || last.length === 5) {
          size = 3
        }
        tmp = last.substr(0, size)
        last = last.substr(size, last.length)
        if (tmp !== '') { seg.push(tmp) }
      }
      if (res.match[0] === '' && res.type === 'special') {
        tmp = res.ndc
      } else if (!!options.format.national && res.cc === options.countryCode) {
        tmp = data[res.cc].national + res.ndc
      } else {
        tmp = '+' + res.cc + options.format.cc + (res.ndc || '')
      }
      tmp += (res.ndc ? options.format.ndc : '') + seg.join(options.format.nn)
      res.formatted = tmp.trim()
    }
  }

  // sanitize the string `str` from annoying chars
  function sanitize (str) {
    return (str || '').replace(/[^\d+]/g, '')
  }

  // match a given `number` using the regular expression `regex`
  function match (number, regex) {
    var res = number.match(regex)
    if (res) {
      res.shift()
      delete (res.index)
      delete (res.input)
    }
    return res
  }

  /**
   * Parse a phonenumber, check international prefix, national routing to
   * output a formatted string, seperated by the known prefix dialing codes
   *
   * @param {String} number : phonenumber to parse
   * @param {Object} options :
   * ```
   *   { countryCode: '1',  // {String} country code (cc) to select as home location, default: '49'
   *     format: {          // formating options
   *       national: false, // {Boolean} prefer international cc format over national, defaults to true
   *       cc: ' ',         // {String} country code separator, defaults to ' '
   *       ndc: ' ',        // {String} nat. dest. code separator, defaults to ' '
   *       nn: ' ',         // {String} other number separator, defaults to ' '
   *     }
   *   }
   * ```
   * @return {Object}
   * ```
   *   { match: {Object} // match of number or `null`
   *     type: {String} `international|fixed|mobile` type of matched number
   *     formatted: {String} formatted number
   *     cc: {String} found country code
   *     ndc: {String} found national destination code
   *     nn: {String} found national number
   *   }
   * ```
   */
  M = function (number, options) {
    var
      i
    var countryCode
    var res = {}

    options = options || {}
    options.countryCode = options.countryCode || config.countryCode
    countryCode = options.countryCode

    number = sanitize(number + '') || ''

    res.match = match(number, regex.international)

    if (res.match && res.match[1]) {
      res.type = 'international'
      countryCode = res.match[1]
      res.cc = countryCode
    }
    if (regex[countryCode]) {
      for (i in regex[countryCode]) {
        res.match = match(number, regex[countryCode][i])
        if (res.match) {
          res.type = i
          res.cc = countryCode
          res.ndc = res.match[1]
          res.nn = res.match[2]
          break
        }
      }
    }
    format(res, options)

    return res
  }

  if (typeof ctx.Window === 'undefined' && typeof module !== 'undefined' && module.exports) {
    // Node.js
    module.exports = M
  } else if (typeof define !== 'undefined' && define.amd) {
    // AMD / RequireJS
    define([], function () {
      return M
    })
  } else if (typeof ctx.Window !== 'undefined' && !ctx[moduleName]) {
    // included in browser via <script> tag
    ctx[moduleName] = M
  }
}(this))
