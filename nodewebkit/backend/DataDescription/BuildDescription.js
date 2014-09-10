//BuildDescription.js
/**
 * @Copyright:
 * 
 * @Description: support API 
 *
 * @author: Wangfeng Xiquan Yuanzhe
 *
 * @Data:2014.9.9
 *
 * @version:0.2.1
 **/
 var config = require("../config");
 var uniqueID = require("../uniqueID");
 var fs = require('fs');
 var path = require("path");

 function createDesFile(newItem,itemDesPath,isLoadEnd,loadResourcesCb){
  var sItem = JSON.stringify(newItem,null,4);
  var sFileName = newItem.filename || newItem.name;
  var pos = "." + (newItem.path).replace(/.+\./, "");
  var spath = itemDesPath+'/'+sFileName+pos+'.md';
  //console.log(spath);
  fs.writeFile(spath, sItem,{flag:'wx'},function (err) {
    if (err) {
      console.log("================");
      console.log("writeFile error!");
      console.log("================");
      if(isLoadEnd)
        loadResourcesCb("successful");
      return;
    }else{
      console.log("write description file success");
      //console.log(isLoadEnd);
      if(isLoadEnd)
        loadResourcesCb("successful");
    }
  });
}

function sortObj(Item,itemDesPath,callback,isLoadEnd,loadResourcesCb){
  var sTags = [];
  var oNewItem = {}
  for(var k in Item){
    sTags.push(k);
  }
  sTags.sort();
  for(var k in sTags){
    oNewItem[sTags[k]] = Item[sTags[k]];
  }
  callback(oNewItem,itemDesPath,isLoadEnd,loadResourcesCb);
}

exports.createItem = function(category,item,itemDesPath,isLoadEnd,loadResourcesCb){

  //Get uniform resource identifier
  var uri = "specificURI";

  uniqueID.getFileUid(function(uri){
    item.category = category;
    if (uri != null) {

      item.URI = uri + "#" + category;
      sortObj(item,itemDesPath,createDesFile,isLoadEnd,loadResourcesCb)
    }
    else{
      console.log("Exception: URI is null.");
      return;
    }
  });
}