# ipport [![Build Status](https://travis-ci.org/bencevans/node-ipport.png?branch=master)](https://travis-ci.org/bencevans/node-ipport)

convert ip:port object/string/buffer

[GitHub](http://github.com/bencevans/node-ipport) [NPM](https://npmjs.org/package/ipport) [Author](http://bensbit.co.uk)

## accepted structures

object: `{address:'address', port:port}`:

* `{address:'127.0.0.1', port:3000}`
* `{address:'8.8.8.8', port:53}`

string: `address:port`:

* `127.0.0.1:3000`
* `8.8.8.8:53`

buffer: `new Buffer([net[0], net[1], net[2], net[3], port(Int16BE)])`:

* `<Buffer 7f 00 00 01 0b b8>`
* `<Buffer 08 08 08 08 00 35>`

## methods

* toObject(IPPort) - returns given IPPort as an object
* toString(IPPort) - returns given IPPort as an string
* toBuffer(IPPort) - returns given IPPort as an buffer

## install

`npm install ipport`


## licence

MIT