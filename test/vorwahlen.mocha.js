'use strict';

/* gloabal describe, it */ 

var
  assert = require('assert'),
  vorwahlen = require('../vorwahlen');

describe('#vorwahlen international numbers', function() {
  it('+1206123456789', function(){
    var
      exp = {"match":["+1","206","123456789"],"type":"fixed","cc":"1","ndc":"206","nn":"123456789","formatted":"+1 206 1234 567 89"},
      res = vorwahlen('+1206123456789');
    assert.deepEqual(res, exp);
  });
  it('206123456789', function(){
    var
      exp = {"match":["","206","123456789"],"type":"fixed","cc":"1","ndc":"206","nn":"123456789","formatted":"206 1234 567 89"},
      res = vorwahlen('206123456789', { countryCode: '1' });
    assert.deepEqual(res, exp);
  });
  it('+8835110123456789', function(){
    var
      exp = {"match":["+","8835110","123456789"],"type":"international","cc":"8835110","formatted":"+8835110 1234 567 89"},
      res = vorwahlen('+8835110123456789');
    assert.deepEqual(res, exp);
  });
  it('+969123456789 no CC exists', function(){
    var
      exp = {"match":null},
      res = vorwahlen('+969123456789');
    assert.deepEqual(res, exp);
  });
});

describe('#vorwahlen local mobile numbers', function() {
  it('0176', function(){
    var
      exp = {"type":"mobile","match":["0","176",""],"cc":"49","ndc":"176","nn":"","formatted":"0176"},
      res = vorwahlen('0176');
    assert.deepEqual(res, exp);
  });
  it('01761', function(){
    var
      exp = {"type":"mobile","match":["0","176","1"],"cc":"49","ndc":"176","nn":"1","formatted":"0176 1"},
      res = vorwahlen('01761');
    assert.deepEqual(res, exp);
  });
  it('017612', function(){
    var
      exp = {"type":"mobile","match":["0","176","12"],"cc":"49","ndc":"176","nn":"12","formatted":"0176 12"},
      res = vorwahlen('017612');
    assert.deepEqual(res, exp);
  });
  it('0176123', function(){
    var
      exp = {"type":"mobile","match":["0","176","123"],"cc":"49","ndc":"176","nn":"123","formatted":"0176 123"},
      res = vorwahlen('0176123');
    assert.deepEqual(res, exp);
  });
  it('01761234', function(){
    var
      exp = {"type":"mobile","match":["0","176","1234"],"cc":"49","ndc":"176","nn":"1234","formatted":"0176 1234"},
      res = vorwahlen('01761234');
    assert.deepEqual(res, exp);
  });
  it('017612345', function(){
    var
      exp = {"type":"mobile","match":["0","176","12345"],"cc":"49","ndc":"176","nn":"12345","formatted":"0176 123 45"},
      res = vorwahlen('017612345');
    assert.deepEqual(res, exp);
  });
  it('0176123456', function(){
    var
      exp = {"type":"mobile","match":["0","176","123456"],"cc":"49","ndc":"176","nn":"123456","formatted":"0176 123 456"},
      res = vorwahlen('0176123456');
    assert.deepEqual(res, exp);
  });
  it('01761234567', function(){
    var
      exp = {"type":"mobile","match":["0","176","1234567"],"cc":"49","ndc":"176","nn":"1234567","formatted":"0176 1234 567"},
      res = vorwahlen('01761234567');
    assert.deepEqual(res, exp);
  });
  it('017612345678', function(){
    var
      exp = {"type":"mobile","match":["0","176","12345678"],"cc":"49","ndc":"176","nn":"12345678","formatted":"0176 1234 5678"},
      res = vorwahlen('017612345678');
    assert.deepEqual(res, exp);
  });
  it('0176123456789', function(){
    var
      exp = {"type":"mobile","match":["0","176","123456789"],"cc":"49","ndc":"176","nn":"123456789","formatted":"0176 1234 567 89"},
      res = vorwahlen('0176123456789');
    assert.deepEqual(res, exp);
  });
  it('01761234567890', function(){
    var
      exp = {"type":"mobile","match":["0","176","1234567890"],"cc":"49","ndc":"176","nn":"1234567890","formatted":"0176 1234 567 890"},
      res = vorwahlen('01761234567890');
    assert.deepEqual(res, exp);
  });
  it('017612345678901', function(){
    var
      exp = {"type":"mobile","match":["0","176","12345678901"],"cc":"49","ndc":"176","nn":"12345678901","formatted":"0176 1234 5678 901"},
      res = vorwahlen('017612345678901');
    assert.deepEqual(res, exp);
  });
  it('0176123456789012', function(){
    var
      exp = {"type":"mobile","match":["0","176","123456789012"],"cc":"49","ndc":"176","nn":"123456789012","formatted":"0176 1234 5678 9012"},
      res = vorwahlen('0176123456789012');
    assert.deepEqual(res, exp);
  });
  it('01761234567890123', function(){
    var
      exp = {"type":"mobile","match":["0","176","1234567890123"],"cc":"49","ndc":"176","nn":"1234567890123","formatted":"0176 1234 5678 901 23"},
      res = vorwahlen('01761234567890123');
    assert.deepEqual(res, exp);
  });
});

describe('#vorwahlen mobile numbers', function() {
  it('+49176123456789', function(){
    var
      exp = {"type":"mobile","match":["+49","176","123456789"],"cc":"49","ndc":"176","nn":"123456789","formatted":"0176 1234 567 89"},
      res = vorwahlen('+49176123456789');
    assert.deepEqual(res, exp);
  });
  it('0049176123456789', function(){
    var
      exp = {"type":"mobile","match":["0049","176","123456789"],"cc":"49","ndc":"176","nn":"123456789","formatted":"0176 1234 567 89"},
      res = vorwahlen('0049176123456789');
    assert.deepEqual(res, exp);
  });
  it('0049(0)176123456789', function(){
    var
      exp = {"type":"mobile","match":["0049","176","123456789"],"cc":"49","ndc":"176","nn":"123456789","formatted":"0176 1234 567 89"},
      res = vorwahlen('0049(0)176123456789');
    assert.deepEqual(res, exp);
  });
  it('(0)176123456789', function(){
    var
      exp = {"type":"mobile","match":["0","176","123456789"],"cc":"49","ndc":"176","nn":"123456789","formatted":"0176 1234 567 89"},
      res = vorwahlen('(0)176123456789');
    assert.deepEqual(res, exp);
  });
  it('+4915081123456789 no NDC exists', function(){
    var
      exp = {"match":null,"type":"international","cc":"49"},
      res = vorwahlen('+4915081123456789');
    assert.deepEqual(res, exp);
  });
});

describe('#vorwahlen fixed numbers', function() {
  it('+4930123456789', function(){
    var
      exp = {"type":"fixed","match":["+49","30","123456789"],"cc":"49","ndc":"30","nn":"123456789","formatted":"030 1234 567 89"},
      res = vorwahlen('+4930123456789');
    assert.deepEqual(res, exp);
  });
  it('004933922123456789', function(){
    var
      exp = {"type":"fixed","match":["0049","33922","123456789"],"cc":"49","ndc":"33922","nn":"123456789","formatted":"033922 1234 567 89"},
      res = vorwahlen('004933922123456789');
    assert.deepEqual(res, exp);
  });
  it('0049(0)34261123456789', function(){
    var
      exp = {"type":"fixed","match":["0049","34261","123456789"],"cc":"49","ndc":"34261","nn":"123456789","formatted":"034261 1234 567 89"},
      res = vorwahlen('0049(0)34261123456789');
    assert.deepEqual(res, exp);
  });
  it('(0)33922123456789', function(){
    var
      exp = {"type":"fixed","match":["0","33922","123456789"],"cc":"49","ndc":"33922","nn":"123456789","formatted":"033922 1234 567 89"},
      res = vorwahlen('(0)33922123456789');
    assert.deepEqual(res, exp);
  });
  it('034209123456789 no NDC exists', function(){
    var
      exp = {"match":null},
      res = vorwahlen('034209123456789');
    assert.deepEqual(res, exp);
  });
});

describe('#vorwahlen formating numbers', function() {
  it('+4930123456789', function(){
    var
      exp = {"type":"fixed","match":["+49","30","123456789"],"cc":"49","ndc":"30","nn":"123456789","formatted":"+49 30 1234 567 89"},
      res = vorwahlen('+4930123456789', { format: {national: false} });
    assert.deepEqual(res, exp);
  });
  it('+4833922123456789', function(){
    var
      exp = {"match":["+","48","33922123456789"],"type":"international","cc":"48","formatted":"+48/3392-2123-456-789"},
      res = vorwahlen('+4833922123456789',  { format: {cc: '/', ndc: ' ', nn: '-' } });
    assert.deepEqual(res, exp);
  });
  it('+4933922123456789', function(){
    var
      exp = {"match":["+49","33922","123456789"],"type":"fixed","cc":"49","ndc":"33922","nn":"123456789","formatted":"+49/33922/1234-567-89"},
      res = vorwahlen('+4933922123456789',  { format: {national: false, cc: '/', ndc: '/', nn: '-' } });
    assert.deepEqual(res, exp);
  });
});

describe('#vorwahlen french numbers', function() {
  it('+331123456789', function(){
    var
      exp = {"match":["+33","1","123456789"],"type":"fixed","cc":"33","ndc":"1","nn":"123456789","formatted":"+33 1 1234 567 89"},
      res = vorwahlen('+331123456789', { format: {national: false} });
    assert.deepEqual(res, exp);
  });
  it('+336123456789', function(){
    var
      exp = {"match":["+33","6","123456789"],"type":"mobile","cc":"33","ndc":"6","nn":"123456789","formatted":"+33 6 1234 567 89"},
      res = vorwahlen('+336123456789', { format: {national: false} });
    assert.deepEqual(res, exp);
  });
  it('097123456789', function(){
    var
      exp = {"match":["0","97","123456789"],"type":"mobile","cc":"33","ndc":"97","nn":"123456789","formatted":"+33 97 1234 567 89"},
      res = vorwahlen('097123456789', { countryCode: '33', format: {national: false} });
    assert.deepEqual(res, exp);
  });
  it('085123456789', function(){
    var
      exp = {"match":["0","8","5123456789"],"type":"special","cc":"33","ndc":"8","nn":"5123456789","formatted":"+33 8 5123 456 789"},
      res = vorwahlen('085123456789', { countryCode: '33', format: {national: false} });
    assert.deepEqual(res, exp);
  });
});

describe('#vorwahlen swiss numbers', function() {
  it('+41328421234', function(){
    var
      exp = {"match":["+41","32842","1234"],"type":"fixed","cc":"41","ndc":"32842","nn":"1234","formatted":"+41 32842 1234"},
      res = vorwahlen('+41328421234', { format: {national: false} });
    assert.deepEqual(res, exp);
  });
  it('+41328371234 number not exists', function(){
    var
      exp = {"match":null,"type":"international","cc":"41"},
      res = vorwahlen('+41328371234', { format: {national: false} });
    assert.deepEqual(res, exp);
  });
  it('0740301234', function(){
    var
      exp = {"match":["0","74030","1234"],"type":"mobile","cc":"41","ndc":"74030","nn":"1234","formatted":"+41 74030 1234"},
      res = vorwahlen('0740301234', { countryCode: '41', format: {national: false} });
    assert.deepEqual(res, exp);
  });
  it('0740311234 number not exists', function(){
    var
      exp = {"match":null},
      res = vorwahlen('0740311234', { countryCode: '41', format: {national: false} });
    assert.deepEqual(res, exp);
  });
  it('1811', function(){
    var
      exp = {"match":["","1811",""],"type":"special","cc":"41","ndc":"1811","nn":"","formatted":"1811"},
      res = vorwahlen('1811', { countryCode: '41' });
    assert.deepEqual(res, exp);
  });
});

describe('#vorwahlen austrian numbers', function() {
  it('+4321601234', function(){
    var
      exp = {"match":["+43","2160","1234"],"type":"fixed","cc":"43","ndc":"2160","nn":"1234","formatted":"+43 2160 1234"},
      res = vorwahlen('+4321601234', { format: {national: false} });
    assert.deepEqual(res, exp);
  });
  it('+4321611234 number not exists', function(){
    var
      exp = {"match":null,"type":"international","cc":"43"} ,
      res = vorwahlen('+4321611234', { format: {national: false} });
    assert.deepEqual(res, exp);
  });
  it('06571234567', function(){
    var
      exp = {"match":["0","657","1234567"],"type":"mobile","cc":"43","ndc":"657","nn":"1234567","formatted":"+43 657 1234 567"},
      res = vorwahlen('06571234567', { countryCode: '43', format: {national: false} });
    assert.deepEqual(res, exp);
  });
  it('06581234567 number not exists', function(){
    var
      exp = {"match":null},
      res = vorwahlen('06581234567', { countryCode: '43', format: {national: false} });
    assert.deepEqual(res, exp);
  });
  it('0939123456', function(){
    var
      exp = {"match":["0","939","123456"],"type":"special","cc":"43","ndc":"939","nn":"123456","formatted":"0939 123 456"},
      res = vorwahlen('0939123456', { countryCode: '43' });
    assert.deepEqual(res, exp);
  });
});
