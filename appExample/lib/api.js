// API lib.
console.log("head of api.js.");
var WDC={};

try {
  WDC=require('demo-rio');
}catch (e){
  console.log("Error happened when require demo-rio:" + e.message);
  console.log("Error: Can not load nodewebkit modules, so we can not use the WDC api.");
}

$(document).ready(function(){
  if (typeof onStart === "function"){
    try{
      var nIndex=window.location.href.lastIndexOf("?");
      var sParam= nIndex<0?null:window.location.href.substring(nIndex + 1, window.location.href.length);
      onStart(sParam);
    }catch(e){
      console.log("Error Happened when execute onStart:" + e.message);
    }
  }
});

WDC.isDebug = true;
WDC.isRemote = false;
console.log("end of api.js.");
