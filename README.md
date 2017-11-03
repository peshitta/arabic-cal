# arabic-cal

[![npm version](https://badge.fury.io/js/arabic-cal.svg)](https://badge.fury.io/js/arabic-cal)
[![npm module downloads](http://img.shields.io/npm/dt/arabic-cal.svg)](https://www.npmjs.org/package/arabic-cal)
[![Build Status](https://travis-ci.org/peshitta/arabic-cal.svg?branch=master)](https://travis-ci.org/peshitta/arabic-cal)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/peshitta/arabic-cal/blob/master/LICENSE)
[![Dependency Status](https://david-dm.org/peshitta/arabic-cal.svg)](https://david-dm.org/peshitta/arabic-cal)
[![devDependencies Status](https://david-dm.org/peshitta/arabic-cal/dev-status.svg)](https://david-dm.org/peshitta/arabic-cal?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/peshitta/arabic-cal/badge.svg?branch=master)](https://coveralls.io/github/peshitta/arabic-cal?branch=master)

Arabic Unicode to CAL Code conversion

## Installation

In order to use this library, [Node.js](https://nodejs.org) should be installed. 
Then run:
```
npm install arabic-cal --save
```

Following bundles are available:
* `arabic-cal.js` - UMD ES5 version for use in browser, node, etc.
* `arabic-cal.min.js` - minified version of `arabic-cal.js`
* `arabic-cal.esm.js` - ES6 module version, suitable for bundling with other 
libraries and applications

The package could also be downloaded directly from:
[https://registry.npmjs.org/arabic-cal/-/arabic-cal-1.0.2.tgz](https://registry.npmjs.org/arabic-cal/-/arabic-cal-1.0.2.tgz)

## More information

[Peshitta App](https://peshitta.github.io)

[Beth Mardutho](https://sedra.bethmardutho.org/about/fonts)

[CAL](http://cal1.cn.huc.edu/searching/fullbrowser.html)

## License

[MIT](https://github.com/peshitta/arabic-cal/blob/master/LICENSE)

## Contributing

The final goal for this work is to learn the Word of God as recorded by
[Peshitta](https://en.wikipedia.org/wiki/Peshitta).
You are welcomed to improve this implementation or provide feedback. Please
feel free to [Fork](https://help.github.com/articles/fork-a-repo/), create a
[Pull Request](https://help.github.com/articles/about-pull-requests/) or
submit [Issues](https://github.com/peshitta/arabic-cal/issues).
Thank you!

## Development

```
npm install
```
```
npm run build
```

## API Reference

* [arabicCal](#module_arabicCal)
    * [.mapper](#module_arabicCal.mapper) : <code>Mapper</code>
    * [.toCal](#module_arabicCal.toCal) ⇒ <code>string</code>

<a name="module_arabicCal.mapper"></a>

### arabicCal.mapper : <code>Mapper</code>
Arabic to CAL Mapper

**Kind**: static constant of [<code>arabicCal</code>](#module_arabicCal)  
<a name="module_arabicCal.toCal"></a>

### arabicCal.toCal ⇒ <code>string</code>
Convert from Arabic to CAL code

**Kind**: static constant of [<code>arabicCal</code>](#module_arabicCal)  
**Returns**: <code>string</code> - the input word converted to CAL  

| Param | Type | Description |
| --- | --- | --- |
| word | <code>string</code> | input word in Arabic Unicode |

