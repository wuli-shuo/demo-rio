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


function createDesFile(newItem){
  var sItem = JSON.stringify(newItem,null,4);
  var sFileName = newItem.filename || newItem.name;
  var spath = config.RESOURCEPATH+'/.des/'+sFileName+'.txt'
  console.log(config.RESOURCEPATH);
  fs.writeFile(spath, sItem,{flag:'w+'},function (err) {
    if (err) {
      console.log("writeFile error!");
      throw err;
    }else{
      console.log("successful");
    }
  });
}

function sortObj(Item,callback){


  var oNewItem = Item;//{};
  callback(oNewItem);
}

exports.createItem = function(category,item,loadResourcesCb){
  var sTableName = null;
  //Get uniform resource identifier
  var uri = "specificURI";
  
  switch(category){
    case 'Contacts' : {
      sTableName = '#contacts';
    }
    break;
    case 'Pictures' : {
      config.dblog('insert picture');
      sTableName = '#pictures';
    }
    break;
    case 'Videos' : {
      config.dblog('insert video');
      sTableName = '#videos';
    }
    break;
    case 'Documents' : {
      config.dblog('insert document');
      sTableName = '#documents';
    }
    break;
    case 'Music' : {
      config.dblog('insert music');
      sTableName = '#music';
    }
    break; 
  }
  //Get uniform resource identifier
  uniqueID.getFileUid(function(uri){
    item.URI = uri + sTableName;
    uniqueID.getRandomBytes(12,function(version){
      if (version != null) {
        item.version = version;
      }
      else{
        console.log("Exception: randomId is null.");
      }
    });
  });
  sortObj(item,createDesFile)
}

exports.testMethod = function(arg1,arg2){
	//TODO

}