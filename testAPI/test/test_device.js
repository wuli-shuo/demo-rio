var mdns = require('../../nodewebkit/lib/api/device.js');
function deviceStateCb(signal, obj){
  interface = obj.interface;
  protocol = obj.protocol;
  name = obj.name;
  stype = obj.stype;
  domain = obj.domain;
  host = obj.host;
  aprotocol = obj.aprotocol;
  address = obj.address;
  port = obj.port;
  txt = obj.txt;
  flags  = obj.flags;
  switch(signal){
    case 'ItemNew':
      console.log('A new device is add, obj: ', obj);
      break;
    case 'ItemRemove':
      console.log('A device is removed, obj: ', obj);
      break;
  }
}

function devicePublishCb(){
  var name = 'xifei';
  var port = '80';
  var txtarray = ['In test_device.js', 'hello, all.'];
  mdns.entryGroupCommit(name,  port, txtarray)
}

function showDeviceListCb(args){
  deviceList = args;
  console.log("\n=====device list as below=====");
  var cnt = 1;
  var obj;
  for(address in deviceList){
    obj = deviceList[address]
    var txtarray = obj.txt
    var txt = ''
    for(var i=0; i<txtarray.length; i++){
      txt += (txtarray[i] + '; ');
     }    
    console.log(obj.address + ':' + obj.port + ' - ' + '"' + obj.name + '" (' + txt + ')');
  }  
}
//mdns.addDeviceListener(deviceStateCb);
mdns.addDeviceListenerToObj(deviceStateCb);
mdns.createServer(devicePublishCb);
setTimeout(function(){mdns.showDeviceList(showDeviceListCb)}, 2000);

setTimeout(function(){
  mdns.entryGroupReset()
}, 4000);


setTimeout(function(){mdns.showDeviceList(showDeviceListCb)}, 6000);
