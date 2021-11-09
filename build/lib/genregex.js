'use strict'

/**
 * generate regular expression from lists of prefix dialing numbers
 */

const HashTree = require('hashtree').HashTree
const fs = require('fs')

const
  M = {}

// add number to array
function add (data, arr) {
  arr = arr || []
  const tmp = (data || '').split(/[\r\n]+/g)

  tmp.forEach(function (i) {
    if (/^[\dx]+$/.test(i)) { // only take numbers
      arr.push(i)
    }
  })
}

// read the numbers from file
function readnumbers (files) {
  let
    tmp
  const nummern = []

  files.forEach(function (file) {
    tmp = fs.readFileSync(file, 'utf8')
    if (tmp) {
      add(tmp, nummern)
    }
  })

  return nummern
}

// build hashmap
function _buildHash (numbers) {
  const
    tree = new HashTree()

  numbers.forEach(function (n) {
    const keyN = []
    const key = (n || '').split('')
    tree.set(key, '#')
    const check = tree.get(key)

    if (!check) {
      while (key.length > 1) {
        keyN.unshift(key.pop())
        if (tree.get(key)) {
          keyN.unshift(key.pop())
          key.push(keyN.join(''))
          tree.set(key, '#')
          break
        }
      }
    }
  })

  tree.sort()
  return tree.tree()
}

// build regex from hashtree
function _buildRegex (tree) {
  // recursive processing of the hashtree
  function regX (tree) {
    let
      a
    let over
    let arr = []
    let res = ''
    let leaf = true
    let init = true

    for (a in tree) {
      arr.push(a)
      if (typeof tree[a] === 'object' || a.length > 1) {
        leaf = false
      }
    }
    arr = arr.sort(function (a, b) {
      // sort by length in descending for numbers like `212` `2129`; the longer one is first
      let cmp
      cmp = b.length - a.length
      if (cmp === 0) {
        cmp = a - b
      }
      return cmp
    })

    if (leaf) {
      // build a regex of type `[0-9]` or `[0-346]`
      if (arr.length > 3) {
        over = 0
        res = '['
        for (a = 0; a < arr.length - 1; a += 1) {
          if (parseInt(arr[a], 10) + 1 === parseInt(arr[a + 1], 10) + 0) {
            if (!over) {
              res += arr[a]
            }
            over += 1
          } else {
            if (over > 1) {
              res += '-'
            }
            over = 0
            res += arr[a]
          }
        }
        if (over) {
          res += '-'
        }
        res += arr[a] + ']'
      } else {
        // build a regex of type `[0246]`
        res = '[' + arr.join('') + ']'
      }
    } else {
      // build a regex of type `(?:0|2|4)`
      arr.forEach(function (a) {
        if (init) {
          init = false
          res = '(?:'
        } else {
          res += '|'
        }
        if (typeof tree[a] !== 'object') {
          res += a
        } else {
          res += a + regX(tree[a])
        }
      })
      res += ')'
    }
    res = res.replace(/(\[0-9\]|\[x\]|x)/g, '\\d')
    return res
  }

  return regX(tree)
}

// build regex from numbers
function buildRegex (numbers) {
  const
    i = _buildHash(numbers)
  // ~ console.log(JSON.stringify(i, null, '  '));
  return _buildRegex(i)
}

M.readnumbers = readnumbers
M._buildHash = _buildHash
M._buildRegex = _buildRegex
M.buildRegex = buildRegex
module.exports = M
