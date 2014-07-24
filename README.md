# Vorwahlen

Format phone numbers for better readability, usability.

Considers international dialing prefixes and national routing schemes.
Currently US-Canada, France and Germany are supported.

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

In case that the national numbering scheme for a given number is invalid `{ match: null }` will be returned.

## References (Numbering Schemes)

* [US+Canada](http://www.nanpa.com/enas/geoAreaCodeNumberReport.do)
* [France](http://www.arcep.fr/index.php?id=8146)
* [Germany](http://www.bundesnetzagentur.de/cln_1431/DE/Sachgebiete/Telekommunikation/Unternehmen_Institutionen/Nummerierung/Rufnummern/Rufnummern_node.html)
* [ITU T0202](http://www.itu.int/oth/T0202.aspx?parent=T0202)

## Development

If you like to add your national numbering scheme not yet supported, fork this project and add the regular expressions for the different types of services (special, mobile, fixed).
In `build/index.js` you'll find a tool to generate the regular expressions from a txt-file, which needs to contain the prefix numbers. Please check out the files in `assets` for more details.

## License

Copyright (c) 2014 commenthol 

Software is released under [MIT][license].

[license]: ./LICENSE
