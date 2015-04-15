// This file is auto generated based on user-defined interface.
// Please make sure that you have checked all TODOs in this file.
// TODO: please replace types with peramters' name you wanted of any functions
// TODO: please replace $ipcType with one of dbus, binder, websocket and socket

var initObj = {
  "address": "nodejs.webde.mix",
  "path": "/nodejs/webde/mix",
  "name": "nodejs.webde.mix",
  "type": "dbus",
  "service": false
}

function Proxy() {
  // TODO: please replace $IPC with the real path of ipc module in your project
  this.ipc = require('../../../nodewebkit/ipc/ipc.js').getIPC(initObj);

  // TODO: choose to implement interfaces of ipc
  /* handle message send from service
  this.ipc.onMsg = function(msg) {
    // TODO: your handler
  }*/

  /* handle the event emitted when connected succeffuly
  this.ipc.onConnect = function() {
    // TODO: your handler
  }*/

  /* handle the event emitted when connection has been closed
  this.ipc.onClose = function() {
    // TODO: your handler
  }*/

  /* handle the event emitted when error occured
  this.ipc.onError = function(err) {
    // TODO: your handler
  }*/
}

Proxy.prototype.getHello = function(callback) {
  var l = arguments.length,
      args = Array.prototype.slice.call(arguments, 0, (typeof callback === 'undefined' ? l : l - 1));
  this.ipc.invoke({
    name: 'getHello',
    in: args,
    callback: callback
  });
};

Proxy.prototype.getHello2 = function(callback) {
  var l = arguments.length,
      args = Array.prototype.slice.call(arguments, 0, (typeof callback === 'undefined' ? l : l - 1));
  this.ipc.invoke({
    name: 'getHello2',
    in: args,
    callback: callback
  });
};

Proxy.prototype.getHello3 = function(callback) {
  var l = arguments.length,
      args = Array.prototype.slice.call(arguments, 0, (typeof callback === 'undefined' ? l : l - 1));
  this.ipc.invoke({
    name: 'getHello3',
    in: args,
    callback: callback
  });
};

Proxy.prototype.openDev = function(callback) {
  var l = arguments.length,
      args = Array.prototype.slice.call(arguments, 0, (typeof callback === 'undefined' ? l : l - 1));
  this.ipc.invoke({
    name: 'openDev',
    in: args,
    callback: callback
  });
};

Proxy.prototype.isLocal = function(callback) {
  var l = arguments.length,
      args = Array.prototype.slice.call(arguments, 0, (typeof callback === 'undefined' ? l : l - 1));
  this.ipc.invoke({
    name: 'isLocal',
    in: args,
    callback: callback
  });
};


Proxy.prototype.on = function(event, handler) {
  this.ipc.on(event, handler);
};

Proxy.prototype.off = function(event, handler) {
  this.ipc.removeListener(event, handler);
};

var proxy = null;
exports.getProxy = function() {
  if(proxy == null) {
    proxy = new Proxy();
  }
  return proxy;
};