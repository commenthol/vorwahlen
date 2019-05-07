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

  extend(data, {
    "international": {
      "prefix": "(\\+|00)",
      "cc": "(1242|1246|1264|1268|1284|1340|1345|1441|1473|1649|1664|1670|1671|1684|1721|1758|1767|1784|1787|1809|1829|1849|1868|1869|1876|1939|1|2(?:0|1[1-368]|2\\d|3\\d|4\\d|5[0-8]|6\\d|7|9[017-9])|3(?:0|1|2|3|4|5\\d|6|7[0-8]|8[0-25-79]|9)|4(?:0|1|2[013]|3|4|5|6|7|8|9)|5(?:0\\d|1|2|3|4|5|6|7|8|9\\d)|6(?:0|1|2|3|4|5|6|7[02-9]|8[0-35-9]|9[012])|7|8(?:1|2|4|5[0235-6]|6|7(?:0|8(?:1[0]))|8(?:0|1[6-9]|2(?:1[36]|3[234])|3(?:5(?:1(?:0[0]|1[0]|3[0])))|6|8))|9(?:0|1|2|3|4|5|6[0-8]|7[1-7]|8|9[2-68]))"
    }
  });

  extend(data, {
    "1": {
      "national": "",
      "prefix": "(\\+1|(?:))",
      "special": "(7(?:0[0]|1[0])|8(?:0[0]|3[3]|4[4]|5[5]|6[6]|7[7]|8[8])|9(?:0[0]))",
      "mobile": "(5(?:0[0]|2[12]|3[3]|4[4]|6[6]|7[7]|8[8])|6(?:0[0]|2[2]))",
      "fixed": "(2(?:0[1-9]|1[02-9]|2[03-68-9]|3[1469]|4[0268-9]|5[0-46]|6[0247-9]|7[0269]|8[149])|3(?:0[1-9]|1[02-9]|2[0135]|3[0-24679]|4[035-7]|5[12]|6[01457]|8[056])|4(?:0[1-9]|1[02-9]|2[345]|3[0-2457-8]|4[0-35]|5[08]|6[39]|7[0358-9]|8[04])|5(?:0[1-9]|1[02-9]|2[0]|3[0149]|4[018]|5[19]|6[1-47]|7[013-59]|8[015-7])|6(?:0[1-9]|1[02-9]|2[0368-9]|3[0169]|4[01679]|5[017]|6[0-2479]|7[018]|8[0-24])|7(?:0[1-9]|1[2-9]|2[014-7]|3[1247]|4[037]|5[478]|6[023579]|7[02-58-9]|8[0-24-7])|8(?:0[1-9]|1[02-9]|2[058-9]|3[0-28]|4[357-9]|5[046-9]|6[02-57-9]|7[02368])|9(?:0[1-9]|1[02-9]|2[058-9]|3[0146-9]|4[0179]|5[12469]|7[0-38-9]|8[04-69]))"
    }
  });

  extend(data, {
    '33': {
      'national': '0',
      'prefix': '(\\+33|0033|0|(?:))0?',
      'special': '(1(?:[578]$|1(?:[245]$|6\\d{3}$|8\\d{3}$|9$)|6\\d{2}$|9[16]$)|3\\d{4}$|8)',
      'mobile': '(6|7[3-9]|700|(?:97|98))',
      'fixed': '([12345])'
    }
  })
  

  extend(data, {
    "41": {
      "national": "0",
      "prefix": "(\\+41|0041|0|(?:))0?",
      "special": "(1(?:1(?:2|4[5]|7|8)|4(?:0|1[45]|3|4|5|7)|6(?:0[0]|1|2|3|4|6)|8(?:0[2]|1[18]))|8(?:0[0]|4\\d|7[8])|9(?:0[016]))",
      "mobile": "(7(?:4(?:0(?:2[2-9]|3[02-9]|5[2-9]|7[89]|8[9]|9\\d)|2(?:2[012]|7[9])|4(?:0[02-57-9]|8[01]|9[02-9])|8(?:1[1]))|5(?:0(?:0\\d)|4(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d|7\\d|8\\d|9\\d)|5(?:0\\d|1\\d|2\\d|3\\d))|6(?:0(?:0\\d)|2(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d|7\\d|8\\d|9\\d)|3(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d|7\\d|8\\d|9\\d)|4(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d|7\\d|8\\d|9\\d)|5(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d|7\\d|8\\d|9\\d)|6(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d|7\\d|8\\d|9\\d)|7(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d|7\\d|8\\d|9\\d)|8(?:0\\d|1\\d|2\\d|3\\d|4\\d|5[0-4]))|7(?:0(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d|7\\d|8\\d|9\\d)|1(?:0\\d|2\\d|3\\d|5\\d)|2(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d|7\\d|8\\d|9\\d)|3(?:1[6])|4(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d|7\\d|8\\d|9\\d)|5(?:0\\d|1\\d|2\\d|3\\d)|8(?:0\\d|1\\d|8\\d|9\\d)|9(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d|7\\d|8\\d|9\\d))|8(?:2(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d)|3(?:0\\d|1\\d|2\\d|3\\d|4\\d|5[0-4])|4(?:0\\d|1\\d|2\\d|9[0])|6(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d|7\\d|8\\d|9\\d)|7(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d|7\\d|8\\d|9\\d)|8(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d|7\\d|8\\d|9\\d)|9(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d|7\\d|8\\d))|9(?:1(?:0\\d|2\\d|3\\d|5\\d|7\\d|9\\d)|2(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d|7\\d|8\\d|9\\d)|3(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d|7\\d|8\\d|9\\d)|4(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d|7\\d|8\\d|9\\d)|5(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d|7\\d|8\\d|9\\d)|6(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d|7\\d|8\\d|9\\d)|7(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d|7\\d|8\\d|9\\d)|8(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d|7\\d|8\\d|9\\d)|9(?:0\\d|1\\d|2\\d|3\\d|4\\d|5\\d|6\\d|7[789]|9\\d))))",
      "fixed": "(2(?:1(?:2(?:1[0-68])|3(?:1\\d|2[01349]|3[0136-8]|4[0-58-9]|5[135-7])|5(?:0[0147-9]|1[0-24579]|2[0-5]|3[0-59]|4[02-7]|5[024-8]|6[013-8]|7[57]|8[018]|9[5])|6(?:0[01]|1[2-46-9]|2[0-7]|3[1-7]|4[1-46-8]|5[1-47]|6[16]|7[1]|8[3]|9[1-57])|7(?:0[1-36-7]|1[1]|2[138-9]|3[12]|8[145]|9[1-369])|8(?:0\\d|1[1]|2[1-68]|3[1]|4[1357]|6[1-4679]|8[1-36-8])|9(?:0[35-9]|2[1-6]|3[1]|4[346-8]|6[0-8]|7[137]|8[139]|9[1459]))|2(?:3(?:0\\d|1[0-25-9]|2[0-357-9]|3[1248-9]|4\\d|5[14]|6\\d|7[2569]|8[258-9]|9[1-47])|4(?:0[04]|1[47-9]|2[0247]|3[146])|5(?:0[0-46-9]|1[0-47-9]|2[013-58-9]|3[013-69]|4[03-8]|5[0-25-8]|6\\d|7[057]|8[0-48]|9[1-69])|7(?:0[02-9]|1[05-9]|2[1-37]|3\\d|4[013-57-9]|5\\d|6[016-8]|7[0-24-9]|8\\d|9\\d)|8(?:0[07-9]|1[06-9]|2[0237]|3[09]|4[09]|5[05]|6[09]|7[09]|8[0458]|9[09])|9(?:0[016-9]|1[07-9]|2[089]|3[09]|4[09]|5[089]|6[0]|7[09]|8[09]|9[0459]))|4(?:4(?:2[02-6]|3[03-68]|4[124-7]|5[3-59]|6[36-8]|7[0-79]|8[124-6]|9[1-68-9])|5(?:0[47-9]|1[0479]|2[0-57]|3[049]|4[0357]|5[0257]|6[3-7]|7[7]|8[8]))|6(?:3(?:0[013-79]|2[123]|4[17]|5[0-29])|4(?:0[0-247-9]|1[1-48-9]|2[24-69]|3[014-79]|6[05-79]|7[05-7]|8[148]|9[2-7])|5(?:0[457-9]|1[0479]|2[0-6]|3[0459]|4[037]|5[025-8]|6[13-6]|7[57]|8[018])|6(?:5[1-3568]|6\\d|7[02-9]|8[46])|9(?:1[235-9]|2[13-57-9]))|7(?:2(?:0[357-8]|8[1-38-9])|3(?:0[3-7]|2[1-46-9]|4[56]|9[4-68-9])|4(?:5[125-9]|7[02-6]|8[013-6])|5(?:0[046-9]|1[0479]|2[0-57]|3[01459]|4[01347]|5[025-8]|6[3-6]|7[027]|8[8])|6(?:0[2-46-7]|1[17])|7(?:2[0-37]|4[346-7]|6[1346-9]|7[15-9]|8[02357-8])|9(?:2[1-47-8]|3[2-58-9]|4[5-8]|5[235-8]|6[678]|7[01347-9])))|3(?:1(?:3(?:0\\d|1[0-58]|2[0146-9]|3\\d|4[0-48-9]|5[0-46-9]|6[68]|7[0-26-9]|8[0-24-9]|9[047-9])|5(?:0\\d|1[014579]|2[0-68-9]|3[0-79]|4[0-47-8]|5[0-35-8]|6[016-7]|7[07]|8[0-46]|9[9])|6(?:3[0-8]|6[046-7]|8[28])|7(?:0[0-257]|1[012]|2[0-24]|3[124-68-9]|4[0-247-8]|5[0-24-6]|6[0-57-9]|7[0-27]|8[012]|9[012])|8(?:0[289]|1[028-9]|2[258-9]|3[289]|4[289]|5[0238-9]|6[27-9]|7[29]|8[289]|9[3])|9(?:0[149]|1[01457-9]|2[0-24-68]|3[0-248-9]|4[014]|5[0-248-9]|6[013-4]|7[0-248-9]|8[0-24-5]|9[0-246-8]))|2(?:3(?:1[0235]|2[1-9]|3[0-48-9]|4[1-6]|5[1-35-8]|6[156]|7[2-46-8]|8[14-79]|9[1-36-7])|4(?:2[0-46-7]|3[1-3568]|6[124-7]|7[14-7]|8[1-9]|9[1-579])|5(?:0[01457-9]|1[0-579]|2[0-69]|3[0-69]|4[03-57]|5[024-9]|6[06]|7[07]|8[0-28]|9[9])|6(?:1[347-8]|2[1-9]|3[013679]|4[145]|5[2-5]|6[156]|7[124579]|8[125-6])|7(?:1[037-8]|2[0-79]|3[0-37]|4[0]|5[1-8]|6[137])|8(?:3[568]|4[1-35-79]|5[2-57-9]|6\\d|8[689])|9(?:1[0-469]|2[024-7]|3\\d|4[0-5]|5\\d|6[1-47-9]))|3(?:2(?:2[1-9]|4[34]|5[12])|3(?:3[03-6]|4[135-6]|5[69])|4(?:3[789]|4[2]|5[3])|5(?:0[457-9]|1[1479]|2[0-5]|3[013-59]|4[0137]|5[0235-7]|6[6]|7[0]|8[8])|6(?:5[0457]|7[1-35-6]|8[14])|7(?:0\\d|1\\d|2[29]|3[36]|4[48]|5[5]|6[5]|7[37]|8[3])|8(?:2[0-36-8]|4[13579]|5[3-6]|8[48])|9(?:5[12]|7[1-35]|8[2]))|4(?:4(?:0[027-9]|1[135]|2[0-46-9]|3[1257-8]|4[5-8]|6[01]|9[13-7])|5(?:0[047-9]|1[1479]|2[0-5]|3[013-59]|4[01347]|5[025-6]|6[6]|7[0]|8[8])))|4(?:1(?:2(?:0\\d|1[018]|2[02-46-9]|4[0-28-9]|5[0259]|6[0-26-9]|8[0-28-9])|3(?:1[0-37-9]|2[029]|4[028-9]|6[0-27-9]|7[0-257-9]|9[0-27-9])|4(?:1[0-246-9]|2[0249]|4[0-2458-9]|5[0158-9]|6[0-247-9]|8[0-24-9]|9\\d)|5(?:0[0146-9]|1[0-2479]|2[0-68-9]|3[0-2459]|4[0-7]|5[2-9]|6[0-26-7]|7[037]|8[0-48]|9[9])|6(?:1[0-28-9]|2[0248-9]|3[0-27-9]|6[0-269]|7[0-2568-9])|7(?:0[09]|1[012]|2[03-9]|4[0137-9]|5[024-9]|6[0136-9]|8[013-57-9]|9[028-9])|8(?:1[0137-9]|2[0258-9]|3[0-3568-9]|5[02457-9]|7[0-2458-9]|8[0-8])|9(?:1[0147-9]|2[0-24-68-9]|3[0-57-9]|7[0-28-9]|8[0248-9]))|3(?:2(?:0[45]|1[015-9]|2[29]|3[3]|4[345]|5[013-9]|6[068]|7[7]|8[2-68]|9[9])|3(?:0[057]|1[17]|2[12]|3[0368]|4[034]|5[5]|6[6]|7[7]|8[8]|9[9])|4(?:1[1]|2[12]|3[034]|4[346]|5[56]|6[6]|7[7]|8[8]|9[579])|5(?:0[0-24-9]|1[01]|2[1-46]|3[014-9]|4\\d|5[0135-9]|7[7]|8[8])|8(?:1\\d|3[34]|4[34]|8[38])|9(?:2[8]|3[1]|6[0]))|4(?:2(?:0[0-24-9]|1\\d|2\\d|3[03-9]|4[0-24-9]|5\\d|6[0-35-9]|7\\d|8[013-9]|9[1-9])|3(?:0\\d|1\\d|2[0-257-8]|3[02-57]|4[0-24]|5[057-8]|6[0-68]|7[0-27]|8\\d|9[0-25-79])|4(?:0[013-6]|1\\d|2[012]|3\\d|4[014-8]|5[014-7]|6[1-3568]|8[0-357-8]|9[1-35-8])|5(?:0\\d|1[0-79]|2[0-579]|3[0-6]|4[02-57-8]|5\\d|6[0-7]|7[05-8]|8[0-68]|9[0568])|6(?:2[357-9]|3\\d|4[345]|5[13-9]|6[068]|8[036-7])|7(?:0[0-49]|1[0-68]|2\\d|3\\d|4\\d|5[0-25]|6[0-47-8]|7[0-7]|8\\d|9[036-9])|8(?:0\\d|1[013-8]|2[0-68-9]|3\\d|4\\d|5\\d|6\\d|7[0-24-9]|8[0-8]|9[3])|9(?:0[58]|1[0-58-9]|2\\d|3\\d|4\\d|5[0-6]|7[024579]|8[0246]|9[1457-9])))|5(?:1(?:2(?:2\\d|8[0-6]))|2(?:2(?:0[2-48-9]|1[2-58-9]|2[02-469]|3[02-58]|4[2-6]|6\\d)|3(?:0[13-5]|1[5-9]|2[0]|3[5-8]|4[35-7]|5[45]|6[3-68-9]|7[4-68]|8[3-6]|9[467])|5(?:0[2-57-9]|1[1479]|2[0-69]|3[0-69]|4[0347-9]|5[0-25-8]|6[069]|7[07]|8[0158])|6(?:2[024-5]|3[0-5]|4[03-79]|5[3479]|7[024-5]|8[0-257])|7(?:2[0-58]|3[0]|4[0-8]|6[1-35-6]|7[07]))|5(?:2(?:1[0-246]|2[0-2459]|4[0-6]|5[01346]|6[03-6]|8[02-6]|9[023])|4(?:1[024-8]|2[02]|4[024-6]|5[01]|6[024-5])|5(?:0[457-9]|1[014579]|2[0-57]|3[013-69]|4[37]|5[0-24-6]|6[67]|7[0]|8[8])|6(?:1[0-24-9]|2[024]|4[02-8]|5[034]))|6(?:2(?:0[0-69]|1[0]|2[1-359]|4[1-35-9]|5[0]|6[5-9]|8[1248]|9[06-9])|3(?:1[0])|4(?:0[1246]|1[06-9]|2[467]|3[06-8]|4[1-48]|5[01]|6[0-46]|7[07]|8[13-6]|9[136])|5(?:0[0147-9]|1[14-79]|2[0-5]|3[014-69]|4[0347]|5[2568]|6[015-7]|7[0]|8[0-28]|9[9])|6(?:1[0168-9]|2[124]|3[134]|4[0148-9]|6[046-8]|7[05-8]))|8(?:0(?:0[013-4]|2[0]|5[89])|1(?:0[015]|1[1]|2[23]|3[3-6]|4[45]|5[8]|7[8]|9[9])|2(?:0[0-8]|1[0-2568-9]|2\\d|3[013-68-9]|4\\d|5[0257-8]|6[1-36-9]|7[24579]|8[03568-9]|9[23])|3(?:0[016-7]|1[0-2679]|2[0-79]|3[0-58]|4[014-6]|5[1-46-9]|6[04]|7[37]|8[46-8]|9[9])|4(?:0[04]|1[14]|2[469]|3[2-46]|4[02-58]|5[0-68-9]|6\\d|7\\d|8\\d|9[9])|5(?:0[0-2568]|1[12457]|2\\d|3[1]|5\\d|6\\d|7\\d|8\\d|9[01568])|6(?:0[06]|1[018-9]|2[6]|3[0-7]|4[89]|5[489]|6[06-8]|7[047-8]|8[06-8])|7(?:0[0257]|1[02357]|2[13468]|3[38]|4[8]|5[08]|6[578]|7[013-7]|8[679]|9[1269])|8(?:0[0-68-9]|1[016-9]|2[27]|3[2-6]|4[48]|5[0-68]|6[146]|7[168]|8[015-9]|9[2-6])|9(?:0[069]|1[01]|2[458-9]|3[45]|4[4]|5[58]|9[89])))|6(?:1(?:2(?:0[124-8]|2[25-9]|6\\d|7\\d|8\\d|9[4-69])|3(?:0[1-35-8]|1[1-35-79]|2[1-8]|3[1-9]|6[1-35-7]|7[35-8]|8[1-35-7])|4(?:0[0-6]|1[135-8]|2[1-35-6]|3[16]|4[4]|6[1-35-9]|8[1-35-7])|5(?:0[0-46-9]|1[0-24579]|2[0-69]|3[013-69]|4[03-57]|5[0-6]|6[0-24-8]|7[057]|8[0-48]|9[9])|6(?:0[0-35-6]|3[1-368-9]|4[135-6]|6[6]|8[1-35-9]|9[0-79])|7(?:0[0-7]|1[1-35-7]|2[1-35-6]|3[135]|4[135]|5[135-6]|6[135-6]|7[1357]|8[13569]|9[135])|8(?:1[135-6]|2[135-7]|3[135-6]|4[135]|5[135-6]|6[135]|7[135])|9(?:0[1-35-6]|1[135]|2[1-35-7]|3[135-6]|4[135]|5[135-6]|6[135-6]|7[135-6]|8[135]|9[1359]))|2(?:2(?:0[025-79]|1[0-368]|8[5-9]|9[135-9])|3(?:1[0-25]|8[46-9]|9[013468])|5(?:0[01347-9]|1[1479]|2[0-57]|3[01459]|4[01346-7]|5[02-9]|6[126]|7[057]|8[018]|9[9])|7(?:2[1346]|3[789]|4[5-9]|5[12468]|6[57-9]|7[1-35-7]|8[57-9]|9[147-8])|8(?:2[2-57]|3[24-9]|4[2-49]|5[578]|6[5-9]|7[13-8]|8[5-9]|9[1-46-7])|9(?:1[5-9]|2[1-3679]|5[5-9]|6[1-68])))|7(?:1(?:2(?:2\\d|3[0-4]|4[2-6]|5[0]|6[0]|7[0247-9]|8[028]|9[028])|3(?:1[013-4]|3[035]|4[034]|5[0-4]|6[0-24-9]|7[0-24-9]|8[0357-8]|9[034])|4(?:1[0-24]|2[0-24]|3[034]|4[046-7]|5[045]|6[01346]|7[047]|9[2-49])|5(?:0[013-57-9]|1[1479]|2[0-6]|3[0-24-69]|4[013-57-8]|5\\d|6[05-7]|7[015-7]|8[058]|9[059])|6(?:2[026-7]|3[0346-8]|4[02468-9]|5[0-24-9]|6[034679]|7[0-27-8]|8[068]|9[0457-9])|7(?:2[0236-7]|3[037]|4[047]|5[057]|6[0136-8]|7[0-257]|8[078]|9[013-9])|8(?:0[017]|4[014-6]|5[058]|6[068]|7[078]|8[068]|9[0168])|9(?:1[0-47-9]|2[0359]|3[012]|4[0457-9]|5[0-25]|6[069]|7[0137-9]|8[02357-8]|9[02-9])))|8(?:1(?:2(?:5[02-8]|8[14-8])|3(?:0[02-46-8]|2[2358]|3[02]|5[346]|7[347-8]|8[245])|4(?:0[1347]|1[03-7]|2[02-4])|5(?:0[0147-9]|1[14579]|2[1-5]|3[01349]|4[0347]|5[2-9]|6[67]|7[0]|8[18]|9[59])|6(?:3[02357]|4[157]|5[0159]|6[014679]|8[14])|7(?:1[0]|2[035]|3[3-68-9]|4[0]|5[05-9]|7[127]|8[3-6])|8(?:2[2468]|3[02-46-9]|4[246]|5[0-2468]|6[0-2468])|9(?:1[1]|2[015-9]|3[135-6]|4[1379])))|9(?:1(?:2(?:0[047-9]|1[03479]|2[0-57-9]|3[013-69]|4[036-7]|5[025]|6[0-26]|8[0-48-9]|9[01])|6(?:0[0-24-68-9]|1[012]|3[0]|4[016-9]|8[234]|9[04-7])|7(?:3[05]|4[3-6]|5[1-69]|6[0]|8[056]|9[1-8])|8(?:0[0-35-9]|1[014-6]|2[0-35-9]|3[0-25]|4[0]|5[017-9]|6[2-9]|7[0-5]|8[018])|9(?:1[0-49]|2[1-4]|3[056]|4[0-6]|5[0]|6[016-8]|7[0-36-7]|8[056]|9[3-69]))))"
    }
  });

  extend(data, {
    "43": {
      "national": "0",
      "prefix": "(\\+43|0043|0|(?:))0?",
      "special": "(1(?:0|1[18])|5|7(?:1[018]|2[0]|3[0]|4[0]|8[0])|8(?:0[04]|1[0]|2[018]|6|7|9)|9(?:0[01]|3[019]|6|7))",
      "mobile": "(6(?:5[0357]|6[013-57-8]|7[06-8]|8[0168-9]|9[069]))",
      "fixed": "(1|2(?:1(?:4[2-7]|6[02-9]|7[2-7])|2(?:1[2-6]|3\\d|4[2-9]|5[2-9]|6[2-9]|7[1-9]|8[2-9])|5(?:2[2-7]|3[2-68]|5[24-7]|7[2-7])|6(?:1\\d|2\\d|3\\d|4[1-9]|6[2-7]|7[234]|8[02-9])|7(?:1[1-9]|2[2-68]|3[1-68-9]|4[1-9]|5[2-8]|6[2-9]|7[234]|8[2-46])|8(?:1[2-6]|2[2-9]|4[1-9]|5[2-9]|6[2-5]|7[2-8])|9(?:1[2-6]|4[2-9]|5[1-9]|8[2-9]))|3(?:1(?:1[2-9]|2[3-7]|3[2-7]|4\\d|5[0-357-9]|6|7\\d|8[2-5])|3(?:2[2-9]|3[1-9]|5[2-9]|6[2-6]|8[235-7])|4(?:5[2-7]|6\\d|7[2-7])|5(?:1[2-6]|3[2-7]|7[1-9]|8[1-8])|6(?:1[1-9]|2[234]|3[1-8]|8[02-9])|8(?:3[234]|4[2-9]|5[2-9]|6[1-9]|8[2-6]))|4(?:2(?:1[2-5]|2[013-9]|3\\d|4[02-8]|5[2-8]|6[2-9]|7[1-9]|8[2-6])|3(?:5[02-9])|6[3]|7(?:1[02-8]|3[2-6]|6[126-9]|8[2-5])|8(?:2[2-6]|4[236-8]|5[2358]|7[2-79]))|5(?:1[2]|2(?:1[234]|2[3-6]|3[02468-9]|4[2-68]|5[2-6]|6[2-6]|7[2-68-9]|8[02-9])|3(?:3[1-9]|5[2-9]|7[2-6])|4(?:1[2-47-8]|4[1-9]|7[2-7])|5(?:1[02-9]|2[2-6]|5[02-46-9]|7[2-9]|8[235])|6(?:3[2-5]|7[2-8]))|6(?:1(?:3[1-8])|2(?:1[2-79]|2[13-9]|3[2-5]|4[0-7]|7[246-8])|4(?:1[2-8]|3[234]|5[2-8]|6[1-36-8]|7\\d|8[34])|5(?:4[1-9]|6[2-6]|8[2-48-9])|6[2])|7(?:2(?:1[1-9]|2[13-9]|3\\d|4\\d|5\\d|6\\d|7[2-46-9]|8\\d)|3(?:2|5[357])|4(?:1[2-6]|3[2-5]|4[2-58]|7[1-9]|8[02-9])|5(?:6[2-6]|8[2-8])|6(?:1[2-9]|6[2-7]|7[2-6]|8[234])|7(?:1[1-46-9]|2[2-47-9]|3[2-6]|4[2-8]|5[0-57-9]|6[2-7])|9(?:4[1-9]|5[2-6])))"
    }
  });

  extend(data, {
    "44": {
      "national": "0",
      "prefix": "(\\+44|0044|0|(?:))0?",
      "special": "(3(?:0\\d|3\\d|4\\d|7\\d)|5(?:0[0]|5|6)|7(?:0|6(?:0|1|2[0-35-9]|3|4|5|6|7|8|9))|8(?:0[08]|4[2-5]|7[0-3])|9(?:0[89\\d]|1\\d|8\\d))",
      "mobile": "(7(?:4(?:\\d\\d)|5(?:\\d\\d)|6(?:2[4])|7(?:\\d\\d)|8(?:\\d\\d)|9(?:\\d\\d)))",
      "fixed": "(1(?:1[3-8]|2(?:0[024-9]|1|2(?:3|4|5|6|7|8|9[2-9])|3[3-79]|4[1-68-9]|5[02-9]|6[0-47-9]|7[013-9]|8[02-9]|9\\d)|3(?:0\\d|1|2[02-9]|3(?:0|2|3|4|5|7|9[2-9])|4[0-46-9]|5[02-9]|6[0-46-9]|7[1-35-79]|8(?:73|0|1|2|3|4|6|7|8[2-9]|9)|9[2457-8])|4(?:0[03-9]|1|2(?:0|2|3[2-9]|4|5|7|8|9)|3(?:0[2-9]|1|2|3|4[2-9]|5|6|7[2-9]|8|9)|4[02-69]|5[0-8]|6[0-79]|7\\d|8[0-57-9]|9[0-79])|5(?:0(?:1|2|3|5|6|7[2-9]|8|9)|1|2(?:42|0|2|4|5|6|7|8|9)|3(?:94|95|96|0|1|4|5|6|8|9)|4[02-9]|5[03-9]|6\\d|7[0-35-9]|8[0-468]|9(?:575|576|0|1|2|3|4|5|7|8|9))|6(?:0[03468-9]|1|2[0-68-9]|3[013-9]|4[1-46-7]|5[0-69]|6[13-9]|7[0-8]|8(?:0|1|3|4|5|6[2-9]|7|8|9)|9(?:73|74|0|1|2|4|5|7|8))|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6(?:83|84|87|0|1|3|4|5|6|7|8|9)|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-57-8]|4(?:0|1|2|3|4|5|7[2-9]|8)|5(?:1[2-9]|2|4|5|6|7|8|9)|6[2-69]|7\\d|8[02-9]|9(?:0[2-9]|2|5|6|9))|9(?:0[02-58-9]|1[2-6]|2[02-68-9]|3[1-57-9]|4(?:67|2|3|4|5|6|7|8|9)|5[0-579]|6(?:2|3|4[2-9]|7|8|9)|7(?:0|1|2|4|5[2-9]|7|8)|8\\d|9[2-57]))|2(?:0|3(?:8\\d|9\\d)|4|8(?:2[0157-9]|3[078]|4[0-4]|6[678]|7[0179]|8[0-25-79]|9[0-57])|9))"
    }
  });

  extend(data, {
    "49": {
      "national": "0",
      "prefix": "(\\+49|0049|0|(?:))0?",
      "special": "(1(?:1(?:0|2|5|6[01])|3[78]|8\\d|9(?:1|2|3|4|8(?:90|6|7|8|9)|9))|8(?:0[0])|9(?:0(?:09|0)))",
      "mobile": "(1(?:5(?:11|12|14|15|16|17|20|21|22|23|25|26|29|70|73|75|77|78|79|90|0(?:2[0]|5[0]|8[0])|1|2|3(?:1\\d)|5(?:5[5]|6[6])|6(?:3[0]|7[8])|7|8(?:8[8])|9)|6[023]|7\\d))",
      "fixed": "(2(?:0(?:1|2|3|4[135]|5[1-468]|6[456]|8|9)|1(?:29|0[234]|1|2|3[1-37]|4|5[0-46-9]|6[1-6]|7[13-5]|8[123]|9[1-35-6])|2(?:0[2-8]|1|2[2-8]|3[2-8]|4[1-8]|5[1-7]|6[1-9]|7[1-5]|8|9[1-7])|3(?:0[1-9]|1|2[3-57]|3\\d|4|5[1-57-9]|6\\d|7[1-57-9]|8[1-57-9]|9[1-5])|4(?:0[1-9]|1|2[1-9]|3[1-6]|4[013-9]|5[1-6]|6[1-5]|7[1-4]|8[24-6])|5(?:0[124-9]|1|2\\d|3[2-68]|4[1-35-8]|5[1-8]|6[1-8]|7[1-5]|8[1-8]|9\\d)|6(?:0[1-8]|1|2[0-8]|3\\d|4[1-7]|5[1-7]|6[1-46-7]|7[1-8]|8\\d|9[1-7])|7(?:1|2[1-5]|3[2-9]|4[1-57]|5[0-58-9]|6[1-4]|7\\d)|8(?:0[1-4]|1|2[1-8]|3[1-9]|4[1-5]|5[0-35-9]|6[1-7]|7[1-4])|9(?:0[2-5]|1|2[1-57-8]|3[1-57-8]|4[1-57-8]|5[1-57-8]|6[1-4]|7[1-57]|8[1-5]|9[1-4]))|3(?:0|2|3(?:0(?:1|2|3|4|5[1-6]|6|7|8[02-9]|9[34])|1|2(?:0\\d|1|2|3[0-57-9]|7|8|9)|3(?:1|2|3[1-8]|4|5|6[1-9]|7|8|9[3-8])|4(?:1|2|3[2-9]|4|5[1246-8]|6|7[02-9])|5|6(?:0[1-9]|1|2|3[1-8]|4|5[2-7]|6|7[1-9])|7(?:0[1-48]|1|2|3[1-4]|4[1-8]|5|6[02-9]|7|8|9)|8(?:1|2|3\\d|4[13-9]|5|6|7[02-8])|9(?:1|2\\d|3[123]|4|5|6[2-9]|7\\d|8[1-469]))|4(?:0|1|2(?:0[2-8]|1|2[1-4]|3|4[1-4]|5|6[123]|9[1-9])|3(?:1|2[12457-8]|3|4[1-8]|5|6[1-4]|7|8[1-6])|4(?:1|2[2-6]|3|4[13-6]|5|6[1-7]|7|8|9[1-8])|5|6(?:0[0-79]|1|2|3[235-9]|4|5[1-468-9]|6|7[123]|9[12])|7(?:1|2[12]|3|4[1-35-6]|5|6|7[1-69]|8[1-35])|9(?:0[13-79]|1|2\\d|3|4|5[3-6]|6|7[35-9]))|5(?:0(?:1|2[0-8]|3[23]|4|5[2-8])|1|2(?:0\\d|1|2|3|4\\d|5|6[3-8]|8|9)|3(?:1|2[2-79]|3|4[123]|5|6[1-5]|7|8[3-9])|4(?:1|2|3[3-69]|4|5[1-6]|6|7[1-8])|5|6(?:0\\d|1|2|3|4|9[1-8])|7(?:1|2[2-8]|3|4|5[1-6]|6|7[1-5]|8|9[235-7])|8(?:1|2[0235-9]|3|4[1-4]|5|6|7[2-7]|8|9[1-5])|9(?:1|2|3\\d|4|5[1-5]|6|7[13-5]))|6(?:0(?:1|2\\d|3|4[123]|5|6|7[124-7]|8[1-57])|1|2(?:0\\d|1|2|3|4|5[2-9]|8|9)|3(?:1|2|3[0-8]|4|5|6|7\\d)|4(?:1|2[1-8]|3|4|5[0-48-9]|6[1-5]|7|8[1-4])|5|6(?:0[1-8]|1|2[1-68]|3|4[02-9]|5[123]|9[1-5])|7(?:0[1-5]|1|2|3\\d|4[1-4]|5|6[1246]|7|8[1-5]|9)|8(?:1|2|3|4\\d|5|6|7[013-58])|9(?:1|2\\d|3|4[013-9]|5|6[1-9]))|7(?:1|2(?:0[02-46-9]|1|2|3|4|5|6|7|9[1-8])|3(?:1|2\\d|3|4[1-46-9]|5|6\\d|7|8[1-4])|4(?:1|2[123]|3\\d|4|5|6[2-57-8])|5|6(?:0\\d|1|2|3|4|5)|7(?:1|2|3|4|5[24-7]))|8(?:1|2(?:0[1-9]|1|2\\d|3[1-4]|9[2-7])|3(?:0\\d|1|2[0-8]|3[1-4]|4|5[1-6]|6|7\\d|8|9[123])|4(?:1|2[2-9]|3|4|5\\d|6[1246]|7|8[1-68])|5|6[0135-9]|7(?:1|2\\d|3[1-35-8]|4|5\\d|6|7|8[0-57-9]|9[1-46-7])|8(?:1|2[1-8]|3|4[1-57-8]|5[0-68-9]|6|7[1-6]))|9(?:0(?:0\\d|1|2|3\\d|4|5\\d|6[12]|7|8\\d|9)|1|2(?:0\\d|1|2[1-6]|3|4[1-8]|5|6[2-8]|8|9[1-8])|3(?:1|2[0-57-9]|3|4[1-9]|5|6[1-6]|7|8[2-46-9]|9\\d)|4(?:0\\d|1|2[1-8]|3|4|5[1-9]|6|7|8[1-57-9]|9)|5|6(?:0[0-8]|1|2|3|4|5|6|7|8|9)|7(?:1|2[1-46-8]|3|4\\d|5[1-4]|6|7[1-9])|8(?:1|2\\d|3[123]|4|5[1-9]|6[123]|7|8[1-9])|9(?:1|2[1-9]|3[1-4]|4|5[1-79]|6|7[1-35-8]|8|9[1-9])))|4(?:0|1(?:0[1-9]|2\\d|3[1-9]|4[0-468-9]|5[1-68-9]|6[1-9]|7[1-9]|8\\d|9[1-5])|2(?:0[2-9]|1|2[1-4]|3\\d|4\\d|5[1-8]|6\\d|7[1-7]|8[1-9]|9[2-8])|3(?:0[2357-8]|1|2[0-46-9]|3\\d|4[02-46-9]|5[1-8]|6[1-7]|7[12]|8[1-5]|9[234])|4(?:0[1-9]|1|2[1-35-6]|3[1-5]|4[1-7]|5[1-68]|6[1-9]|7[1-57-9]|8\\d|9[1-9])|5(?:0[1-68-9]|1|2[1-9]|3[1-79]|4[1-7]|5\\d|6[1-4])|6(?:0[2-9]|1|2[1-7]|3\\d|4[1-46]|5[1]|6[1-8]|7[1-4]|8[1-4])|7(?:0[2-8]|1|2[1-5]|3[1-7]|4\\d|5[1-8]|6[1-9]|7\\d|9[1-6])|8(?:0[2-6]|1|2[1-9]|3[02-9]|4[1-9]|5[1-9]|6[1-5]|7[1-7]|8[1-5]|9[23])|9(?:0[23]|1|2\\d|3[1-68-9]|4[1-8]|5\\d|6[1-8]|7[1-7]))|5(?:0(?:2[1-8]|3[1-7]|4[1-5]|5[1-6]|6[02-9]|7[1-4]|8[2-6])|1(?:0[1-358-9]|1|2[136-9]|3[0-25-9]|4[1-9]|5[1-9]|6[1-8]|7[1-7]|8[1-7]|9\\d)|2(?:0[1-9]|1|2[1-68]|3[1-8]|4[124-8]|5[0-57-9]|6[1-6]|7[1-8]|8[1-6]|9[2-5])|3(?:0\\d|1|2\\d|3[1-79]|4[14-7]|5[1-8]|6[1-8]|7[1-9]|8[1-4])|4(?:0[1-79]|1|2[1-9]|3[1-9]|4[1-8]|5[1-9]|6[124-8]|7[1-6]|8[1-5]|9[1-5])|5(?:0[2-9]|1|2[0-57-9]|3[1-6]|4[1-6]|5[1-6]|6[1-5]|7[1-4]|8[2-6]|9[234])|6(?:0[1-9]|1|2[1-6]|3[1-6]|4[1-8]|5\\d|6[1-5]|7[1-7]|8[1-6]|9[1-6])|7(?:0[2-7]|1|2[1-6]|3[1-4]|4[1-6]|5[1-5]|6[13-9]|7[1-7])|8(?:0[2-8]|1|2\\d|3[1-9]|4[0-68-9]|5[0-57-9]|6[1-5]|7[2-5]|8[23])|9(?:0[1-9]|1|2[1-6]|3[1-79]|4[1-8]|5[1-7]|6[1-6]|7[135-8]))|6(?:0(?:0[2-47-8]|2[0-46-9]|3[1-69]|4[1-9]|5\\d|6[1-368]|7[1348]|8[1-7]|9[2-6])|1(?:0[1-9]|1|2[02-46-9]|3[0-68-9]|4[24-7]|5[0-2457-9]|6[1-7]|7[1-5]|8[1-8]|9[02568])|2(?:0[1-79]|1|2[0-46-9]|3[1-9]|4[1-79]|5[1-8]|6[1-9]|7[124-6]|8[1-7]|9[1-8])|3(?:0[1-8]|1|2[1-9]|3[1-9]|4\\d|5[1-35-9]|6[1-4]|7[1-5]|8[1-7]|9[1-8])|4(?:0\\d|1|2\\d|3[0-68-9]|4[0-79]|5[1-8]|6[124-8]|7[1-9]|8[2-6])|5(?:0\\d|1|2[2-7]|3[1-6]|4[1-5]|5\\d|6[1-9]|7[1-58]|8\\d|9[1-79])|6(?:1|2\\d|3[013-9]|4[1-8]|5\\d|6[013-9]|7[02-8]|8[1-4]|9[1-8])|7(?:0[1346-9]|1|2[1-8]|3[1-7]|4[1-7]|5[1-8]|6[1-6]|7[1-6]|8[1-9])|8(?:0[2-69]|1|2[14-7]|3[1-8]|4[1-48-9]|5[1-8]|6[14-9]|7[1-6]|8[178]|9[347-8])|9)|7(?:0(?:0|2[1-6]|3[1-4]|4[1-6]|5[1-6]|6[236]|7[123]|8[1-5])|1(?:1|2[1-9]|3[0-68-9]|4[1-8]|5[0-46-9]|6[1-6]|7[1-6]|8[1-4]|9[1-5])|2(?:0[234]|1|2\\d|3[1-7]|4[02-9]|5\\d|6\\d|7[1-7])|3(?:0[02-9]|1|2[1-9]|3[1-7]|4[03-8]|5[1-8]|6[1-7]|7[13-6]|8[1-9]|9[1-5])|4(?:0[234]|1|2[02-9]|3[1-6]|4\\d|5[1-9]|6[1-7]|7[1-8]|8[2-6])|5(?:0[2-6]|1|2[02457-9]|3[1-4]|4[1-6]|5[1-8]|6[1-9]|7\\d|8[1-7])|6(?:0[2]|1|2\\d|3[1-6]|4[1-6]|5[1-7]|6\\d|7[1-6]|8[1-5])|7(?:0[2-9]|1|2\\d|3[1-68-9]|4[1-8]|5[13-5]|6[1-5]|7[13-57])|8(?:0[2-8]|1|2[1-6]|3[1-9]|4[1-4]|5[1-4])|9(?:0[3-7]|1|3\\d|4\\d|5[0-57-9]|6[1-7]|7[1-7]))|8(?:0(?:2\\d|3[1-68-9]|4[1-35-6]|5[1-7]|6[1-7]|7[1-6]|8[1-6]|9[1-5])|1(?:0[24-6]|1|2[1-4]|3[13-9]|4[1-6]|5[1-37-8]|6[15-8]|7[016-9]|9[1-6])|2(?:0[2-8]|1|2[1-6]|3[0-46-9]|4[135-9]|5[0-47-9]|6[1-35-9]|7[1-46]|8[1-5]|9[1-6])|3(?:0[2-46]|1|2[0-8]|3[0-8]|4\\d|6[1-9]|7[02-9]|8\\d|9[2-5])|4(?:0[2-7]|1|2[1-46-7]|3[1-5]|4[1-6]|5[02-46-9]|6\\d)|5(?:0[1-79]|1|3[1-8]|4[1-9]|5[0-8]|6[1-5]|7[1-4]|8[1-6]|9[123])|6(?:1|2[1-48-9]|3[013-9]|4[0-29]|5[0-246-7]|6[1-79]|7[017-9]|8[1-7])|7(?:0[2-9]|1|2[1-8]|3[1-5]|4[1-5]|5[1-46]|6[124-6]|7[1-4]|8[1-5])|8(?:0[1-35-9]|1|2[1-5]|4[15-7]|5[16-8]|6[0-27-9])|9)|9(?:0(?:6|7[0-8]|8\\d|9[0-479])|1(?:0[1-7]|1|2[0236-9]|3[1-5]|4[1-9]|5[1-8]|6[1-7]|7\\d|8\\d|9\\d)|2(?:0[1-9]|1|2[0-357-9]|3[1-68]|4[1-6]|5[1-7]|6\\d|7\\d|8\\d|9[2-5])|3(?:0[235-7]|1|2[13-6]|3[1-9]|4\\d|5\\d|6[03-79]|7[1-8]|8[1-6]|9[1-8])|4(?:0[1-9]|1|2[0-46-9]|3[13-68-9]|4[1-8]|5[1-4]|6[1-9]|7[1-4]|8[0-24]|9[1-357-9])|5(?:0[2-5]|1|2[1-9]|3[1-6]|4[2-9]|5[1-6]|6\\d|7[1-6])|6(?:0[2-8]|1|2[124-8]|3[1-9]|4[1-8]|5[1-9]|6[1-6]|7[1-7]|8[123])|7(?:0[148]|1|2\\d|3[2-8]|4[124-9]|6[1-6]|7[1-9])|8(?:0[2-5]|1|2[02-9]|3[1-7]|4[1-8]|5[1-7]|6[157-9]|7[1-6])|9(?:0[13-8]|1|2\\d|3[1-35-8]|4[1-8]|5[1-6]|6[1-6]|7[1-8])))"
    }
  });

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
