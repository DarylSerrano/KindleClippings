# KindleClippings 
WIP CLI tool for parsing clippings made on the Kindle.
## Installing the CLI
`npm install -g .`
## Usage CLI
`kindle-clippings -i "My Clippings.txt" --org "./clippings"`
## Usage development
`npm run dev -- [args]`
## Instaling and using only the parser and modules
`npm install`

In your javascript file require the package
```javascript
const kindleClippings = require('kindle-clippings');
```
## Where are the clippings file stored on my Kindle?
Clippings file is usually stored in the path `/documents/My Clippings.txt` of your kindle