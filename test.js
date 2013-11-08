
var assert = require('assert');
var ipport = require('./');


describe('toString()', function() {
  it('should convert an object', function() {
    assert.equal(ipport.toString({address:'192.168.1.1', port:3000}), '192.168.1.1:3000');
  });
  it('should return a string', function() {
    assert.equal(ipport.toString('127.0.0.1:3000'), '127.0.0.1:3000');
  });
  it('should convert a buffer', function() {
    assert.equal(ipport.toString(new Buffer([255, 255, 255, 255, 20, 20])), '255.255.255.255:5140');
  });
});

describe('toObject()', function() {
  it('should return an object', function() {
    assert.deepEqual(ipport.toObject({address:'192.168.1.1', port:3000}), {address:'192.168.1.1', port:3000});
  });
  it('should convert a string', function() {
    assert.deepEqual(ipport.toObject('127.0.0.1:3000'), {address:'127.0.0.1', port:3000});
  });
  it('should convert a buffer', function() {
    assert.deepEqual(ipport.toObject(new Buffer([255, 255, 255, 255, 20, 20])), {address:'255.255.255.255', port:5140});
  });
});

describe('toBuffer()', function() {
  it('should convert an object', function() {
    assert.deepEqual(ipport.toBuffer({address:'192.168.1.1', port:3000}), new Buffer([192, 168, 1, 1, 11, 184]));
  });
  it('should convert a string', function() {
    assert.deepEqual(ipport.toBuffer('127.0.0.1:3000'), new Buffer([127, 0, 0, 1, 11, 184]));
  });
  it('should return a buffer', function() {
    assert.deepEqual(ipport.toBuffer(new Buffer([255, 255, 255, 255, 20, 20])), new Buffer([255, 255, 255, 255, 20, 20]));
  });
});

describe('invalid inputs', function() {
  it('should throw an error on an invalid string', function() {
    assert.throws(function() {
      ipport.toString('thisReallyIsNotAnIPAddress');
    });
  });
  it('should throw an error on an invalid object', function() {
    assert.throws(function() {
      ipport.toString({});
    });
    assert.throws(function() {
      ipport.toString({port:'hello', address: 123});
    });
  });
});