var path = require("path");
<<<<<<< HEAD
var commonDAO = require("./commonHandle/CommonDAO");


=======
var desktopConf = require("./data/desktop");
var contacts = require("./data/contacts");
var documents = require("./data/document");
var pictures = require("./data/picture");
var video = require("./data/video");
var music = require("./data/music");
var devices = require("./data/device");
>>>>>>> 1f17bff72ae5aa5ed8c92b947962e6ab7eaddef1
//@const
var DATA_DIR = "data";

function parsePath(path){
  var pathNodes = path.split('/');
  var pathNew = '';
  for (var i = 0; i < pathNodes.length; i++) {
    if (pathNodes[i].indexOf(' ') != -1) {
      pathNew += '"' + pathNodes[i] + '"/';
    } else {
      pathNew += pathNodes[i] + '/';
    }
  }
  pathNew = pathNew.substring(0, pathNew.length - 1);
  return pathNew;
}
exports.parsePath = parsePath;

//get the catefory from URI
function getCategoryByUri(sUri){
  var pos = sUri.lastIndexOf("#");
  var cate = sUri.slice(pos + 1, sUri.length);
  return cate;
}
exports.getCategoryByUri=getCategoryByUri;

//get the catefory from URI
exports.getCategoryObjectByUri = function(sUri){
  var cate = getCategoryByUri(sUri);
    switch (cate) {
    case "contact":
      {
        return contacts;
      }
      break;
    case "picture":
      {
        return pictures;
      }
      break;
    case "document":
      {
        return documents;
      }
      break;
    case "music":
      {
        return music;
      }
      break;
    case "video":
      {
        return video;
      }
      break;
    default:
      return null;
  }
}

exports.getDesPath = function(category, fullName) {
  var sDirName = category + "Des";
  var sDesName = fullName+".md";
  return path.join(process.env["HOME"],".resources",sDirName,DATA_DIR,sDesName);
}

exports.getRealDir = function(category){
  return path.join(process.env["HOME"],".resources",category,DATA_DIR);
}

exports.getDesDir = function(category) {
  var sDirName = category + "Des";
  return path.join(process.env["HOME"],".resources",sDirName,DATA_DIR);
}

exports.getCategory = function(path) {
  var pointIndex = path.lastIndexOf('.');
  if (pointIndex == -1) {
    var itemPostfix = "none";
    var nameindex = path.lastIndexOf('/');
    var itemFilename = path.substring(nameindex + 1, path.length);
  } else {
    var itemPostfix = path.substr(pointIndex + 1);
    var nameindex = path.lastIndexOf('/');
    var itemFilename = path.substring(nameindex + 1, pointIndex);
  }
  if (itemPostfix == 'none' ||
    itemPostfix == 'ppt' ||
    itemPostfix == 'pptx' ||
    itemPostfix == 'doc' ||
    itemPostfix == 'docx' ||
    itemPostfix == 'wps' ||
    itemPostfix == 'odt' ||
    itemPostfix == 'et' ||
    itemPostfix == 'txt' ||
    itemPostfix == 'xls' ||
    itemPostfix == 'xlsx' ||
    itemPostfix == 'ods' ||
    itemPostfix == 'zip' ||
    itemPostfix == 'sh' ||
    itemPostfix == 'gz' ||
    itemPostfix == 'html' ||
    itemPostfix == 'et' ||
    itemPostfix == 'odt' ||
    itemPostfix == 'pdf' ||
    itemPostfix == 'html5ppt') {
    return {
      category: "Documents",
      filename: itemFilename,
      postfix: itemPostfix
    };
  } else if (itemPostfix == 'jpg' || itemPostfix == 'png') {
    return {
      category: "Pictures",
      filename: itemFilename,
      postfix: itemPostfix
    };
  } else if (itemPostfix == 'mp3' || itemPostfix == 'ogg') {
    return {
      category: "Music",
      filename: itemFilename,
      postfix: itemPostfix
    };
  } else if (itemPostfix == 'conf' || itemPostfix == 'desktop') {
    return {
      category: "Configuration",
      filename: itemFilename,
      postfix: itemPostfix
    };
  }
}

exports.renameExists = function(allFiles) {
  var fileNameBase = {};
  var k = 0;
  for (var i = 0; i < allFiles.length; i++) {
    var item = allFiles[i];
    var fileName = item.filename;
    if (!fileNameBase.hasOwnProperty(item.filename)) {
      fileNameBase[item.filename] = true;
    } else {
      while (fileNameBase.hasOwnProperty(fileName)) {
        k++;
        fileName = fileName + '(' + k + ')';
      }
      allFiles[i].filename = fileName;
      k = 0;
    }
  }
  return allFiles;
}