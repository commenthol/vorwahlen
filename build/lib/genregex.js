'use strict';

/**
 * generate regular expression from lists of prefix dialing numbers
 */

var
  HashTree = require('hashtree').HashTree,
  fs = require('fs');

var
  M = {};

// add number to array
function add (data, arr) {
  var
    arr = arr || [],
    tmp = (data || '').split(/[\r\n]+/g);

  tmp.forEach(function(i){
    if (/^\d+$/.test(i)) { // only take numbers
      arr.push(i);
    } 
  });
}

// read the numbers from file
function readnumbers (files) {
  var
    tmp,
    nummern = [];

  files.forEach(function(file) {
    tmp = fs.readFileSync(file, 'utf8');
    if (tmp) {
      add(tmp, nummern);
    }
  });
  
  return nummern;
}

// build hashmap
function _buildHash (numbers) {
  var
    tree = new HashTree();

  numbers.forEach(function(n){
    var
      i,
      check,
      keyN = [],
      key = (n||'').split('');
    tree.set(key, '#');
    check = tree.get(key);
    if (!check) {
      //~ console.log('#bad', key);
      while (key.length>1) {
        keyN.unshift(key.pop());
        //~ console.log(key, keyN, tree.get(key));
        if (tree.get(key)) {
          keyN.unshift(key.pop());
          key.push(keyN.join(''));
          tree.set(key, '#');
          break;
        }
      }
    }
  });

  tree.sort();
  return tree.tree();
} 

// build regex from hashtree
function _buildRegex (tree) {
  var
    regex = '';

  // recursive processing of the hashtree
  function regX(tree) {
    var
      a,
      over,
      arr = [],
      res = '',
      leaf = true,
      init = true;

    for (a in tree) {
      arr.push(a);
      if (typeof tree[a] === 'object' || a.length > 1) {
        leaf = false;
      }
    }
    arr = arr.sort(function(a, b) {
      // sort by length in descending for numbers like `212` `2129`; the longer one is first
      return b.length - a.length;
    });

    if (leaf) {
      // build a regex of type `[0-9]` or `[0-346]`
      if (arr.length > 3) {
        over = 0;
        res = '[';
        for (a=0; a < arr.length-1; a+=1) {
          if (parseInt(arr[a],10)+1 === parseInt(arr[a+1],10)+0) {
            if (!over) {
              res += arr[a];
            }
            over += 1;
          }
          else {
            if (over > 1) {
              res += '-';
            }
            over = 0;
            res += arr[a];
          }
        }
        if (over) {
          res += '-';
        }
        res += arr[a] + ']';
      }
      else {
        // build a regex of type `[0246]`
        res = '[' + arr.join('') + ']';
      } 
    }
    else {
      // build a regex of type `(?:0|2|4)`
      arr.forEach(function(a){
        if (init) {
          init = false;
          res = '(?:'
        }
        else {
          res += '|';
        }
        if (typeof tree[a] !== 'object') {
          res += a;
        }
        else {
          res += a + regX(tree[a]);
        }
      });
      res += ')';
    }
    
    return res;
  }

  return regX(tree);
}

// build regex from numbers
function buildRegex (numbers) {
  return _buildRegex(_buildHash(numbers));
}

M.readnumbers = readnumbers;
M._buildHash = _buildHash;
M._buildRegex = _buildRegex;
M.buildRegex = buildRegex;
module.exports = M;

