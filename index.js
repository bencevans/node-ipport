
function readString(str) {
  var match = str.match(/^([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})\:([0-9]{0,5})$/);
  if(!match || 1 > parseInt(match[2], 10) > 65535) {
    throw new Error('Invalid IPv4 String');
  }
  return {
    address: match[1],
    port: parseInt(match[2], 10)
  };
}

function readBuffer(buf) {
  var output = {};
  output.address = buf[0] + '.' + buf[1] + '.' + buf[2] + '.' + buf[3];
  output.port = buf.readUInt16BE(4);
  return output;
}

function readObject(ipPort) {
  if(typeof ipPort.address !== 'string' || typeof ipPort.port !== 'number') {
    throw new Error('Invalid IP/Port Object');
  }
  return ipPort;
}

function normalise (obj) {
  if(typeof obj == 'string') {
    return readString(obj);
  } else if(Buffer.isBuffer(obj)) {
    return readBuffer(obj);
  } else if(typeof obj == 'object') {
    return readObject(obj);
  } else {
    throw new Error('Unknown IP:PORT type');
  }
}

var toString = function(obj) {
  var ipPort = normalise(obj);
  return ipPort.address + ':' + ipPort.port;
};

var toObject = function(obj) {
  var ipPort = normalise(obj);
  return {address:ipPort.address, port:ipPort.port};
};

var toBuffer = function(obj) {
  var ipPort = normalise(obj);
  var buf = new Buffer(6);
  buf[0] = ipPort.address.split('.')[0];
  buf[1] = ipPort.address.split('.')[1];
  buf[2] = ipPort.address.split('.')[2];
  buf[3] = ipPort.address.split('.')[3];
  buf.writeUInt16BE(ipPort.port, 4);
  return buf;
};

module.exports.toString = toString;
module.exports.toObject = toObject;
module.exports.toBuffer = toBuffer;