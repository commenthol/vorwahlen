# Vorwahlen

Format phone numbers for better readability, usability.

Considers international dialing prefixes and national routing schemes.
Currently US-Canada, France and Switzerland, Austria and Germany are supported.

The intention of this library is to provide a better and user-friendly way to enter any kind of phone-numbers into a single input-field.
Instead of the usual way for the user having to enter prefix and number into different fields, the values are separated any clustered by this library.

Different types indicate the usage for the given number:
* _international_: An international number. The national scheme is yet unsupported.
* _special_: A special phonenumber range, e.g. for governmental, pay or tollfree services
* _mobile_: Non-geographiocal services like mobile networks
* _fixed_: Geographiocal services like fixed-line networks

The module is usable in Node.js, AMD / RequireJS, and the Browser

## Usage

```javascript
var res = require('vorwahlen')('+4917612345678');
//> res = { match: [ '+49', '176', '12345678' ],
//>         type: 'mobile',
//>         cc: '49',
//>         ndc: '176',
//>         nn: '12345678',
//>         formatted: '0176 1234 5678' }
```

The format of the formatted string can be altered with:

```javascript
var res = require('vorwahlen')('+493012345678', { format: { national: false, cc: '/', ndc: '_', nn: '-' }});
//> res = { match: [ '+49', '30', '12345678' ],
//>         type: 'mobile',
//>         cc: '49',
//>         ndc: '30',
//>         nn: '12345678',
//>         formatted: '+49/30_1234-5678' }
```

In case that the national numbering scheme for a given number is invalid `{ match: null }` will be returned.

```javascript
var res = require('vorwahlen')('+493112345678');
//> res = { match: null,
//>         type: 'international',
//>         cc: '49' }
```

## Interface

Parse a phonenumber, check international prefix, national routing to
output a formatted string, seperated by the known prefix dialing codes

@param {String} number : phonenumber to parse
@param {Object} options :
```
  { countryCode: '1',  // {String} country code (cc) to select as home location, default: '49'
    format: {          // formating options
      national: false, // {Boolean} prefer international cc format over national, defaults to true
      cc: ' ',         // {String} country code separator, defaults to ' '
      ndc: ' ',        // {String} nat. dest. code separator, defaults to ' '
      nn: ' ',         // {String} other number separator, defaults to ' '
    }
  }
```
@return {Object}
```
  { match: {Object} // match of number or `null`
    type: {String} `international|fixed|mobile` type of matched number
    formatted: {String} formatted number
    cc: {String} found country code
    ndc: {String} found national destination code
    nn: {String} found national number
  }
```

## References (Numbering Schemes)

* [ITU T0202](http://www.itu.int/oth/T0202.aspx?parent=T0202)
* +1 [US+Canada](http://www.nanpa.com/enas/geoAreaCodeNumberReport.do)
* +33 [France](http://www.arcep.fr/index.php?id=8146)
* +41 [Switzerland](http://www.bakom.admin.ch/themen/telekom/00479/00604/index.html?lang=en)
* +43 [Austria](https://www.rtr.at/en/tk/E129)
* +49 [Germany](http://www.bundesnetzagentur.de/cln_1431/DE/Sachgebiete/Telekommunikation/Unternehmen_Institutionen/Nummerierung/Rufnummern/Rufnummern_node.html)

## Running Tests & Contributing

To run the tests use `npm test`.

If you like to add your national numbering scheme not yet supported, fork this project and add the regular expressions for the different types of services (special, mobile, fixed).
In `build/index.js` you'll find a tool to generate the regular expressions from a txt-file, which needs to contain the prefix numbers. Please check out the files in `assets` for more details.

## Contribution

If you contribute code to this project, you are implicitly allowing your code
to be distributed under the MIT license. You are also implicitly verifying that
all code is your original work.

## License

Copyright (c) 2014 commenthol

Software is released under [MIT][license].

[license]: ./LICENSE
