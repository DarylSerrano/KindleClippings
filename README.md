# KindleClippings 
[![npm version](https://badge.fury.io/js/%40darylserrano%2Fkindle-clippings.svg)](https://badge.fury.io/js/%40darylserrano%2Fkindle-clippings)


WIP CLI tool for parsing clippings made on the Kindle into json files. 


For now, it only parses clippings made on a Kindle with language setted on **English or Spanish**
## Installing the CLI
`npm i -g @darylserrano/kindle-clippings`
## Usage of the CLI
`kindle-clippings -i "My Clippings.txt" -d "./clippings"`
## Usage development
`npm run dev -- [args]`
## Instaling and using it in your code
`npm i @darylserrano/kindle-clippings`

In your javascript file require the package and use it
```javascript
const kindleClippings = require('@darylserrano/kindle-clippings');

kindleClippings.readKindleClippingFile("./clippings/clipp_short.txt").then((entries) => {
    console.log(JSON.stringify(entries[0].toJSON()));
    var entriesParsed = kindleClippings.parseKindleEntries(entries);
    kindleClippings.saveByAuthor(entriesParsed,"./clippings");
}).catch((err) => {
    console.log(err)
});
```