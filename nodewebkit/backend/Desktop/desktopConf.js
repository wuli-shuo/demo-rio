/**
 * @Copyright:
 *
 * @Description: API for desktop configuration.
 *
 * @author: Xiquan
 *
 * @Data:2014.10.13
 *
 * @version:0.1.1
 **/
var path = require('path');
var fs = require('fs');
var os = require('os');
var config = require("../config");
var dataDes = require("../FilesHandle/desFilesHandle");
var resourceRepo = require("../FilesHandle/repo");
var util = require('util');
var events = require('events');
var uniqueID = require("../uniqueID");
var fs_extra = require('fs-extra');


function newInit(initType) {
  var initTheme = {
    name: null,
    active: null,
    icon: null,
    path: null,
    id: null,
    pos: {
      x: null,
      y: null
    }
  }
  var initWidget = {
    id: null,
    path: null,
    position: {
      x: null,
      y: null
    }
  }
  if (initType === "theme") {
    return initTheme;
  } else if (initType === "widget") {
    return initWidget;
  }
}

function getnit(initType) {
  if (initType === "theme") {
    var _icontheme = newInit(initType);
    _icontheme.name = 'Mint-X';
    _icontheme.active = true;
    _icontheme.path = '$HOME';
    _icontheme.id = 'computer';

    var _computer = newInit(initType);
    _computer.name = 'Computer';
    _computer.active = false;

    var _trash = newInit(initType);
    _trash.name = 'Trash';
    _trash.active = false;

    var _network = newInit(initType);
    _network.name = 'Network'
    _network.active = false;

    var _document = newInit(initType);
    _document.name = 'Document';
    _document.active = false;

    var result = {
      icontheme: _icontheme,
      computer: _computer,
      trash: _trash,
      network: _network,
      document: _document
    }

    return result;
  } else if (initType === "widget") {

    var result = {
      cat: newInit(initType),
      book: newInit(initType),
      boat: newInit(initType),
      book1: newInit(initType),
      totem_dock: newInit(initType),
      firefox_dock: newInit(initType)
    }
    return result;
  }

}


/** 
 * @Method: initConf
 *    init desktop config dir
 *
 * @param: callback
 *    result as a json object
 **/
function initConf(callback) {
  var systemType = os.type();
  if (systemType === "Linux") {
    var path = config.RESOURCEPATH + "/.desktop";
    fs.mkdir(path, function(err) {
      if (err) {
        console.log(err);
        return;
      }
      var pathApp = path + "/application";
      var pathDesk = path + "/desktop";
      var pathDock = path + "/dock";
      var pathTheme = path + "/Theme.conf";
      var pathWidget = path + "/Widget.conf"

      var tmpThemw = getnit("theme");
      var tmpWidget = getnit("widget");
      var sItemTheme = JSON.stringify(tmpThemw, null, 4);
      var sItemWidget = JSON.stringify(tmpWidget, null, 4);


      fs.writeFile(pathTheme, sItemTheme, function(err) {
        if (err) {
          console.log("init Theme config file error!");
          console.log(err);
        }
        callback("success_init_theme");
      });
      fs.writeFile(pathWidget, sItemWidget, function(err) {
        if (err) {
          console.log("init Widget config file error!");
          console.log(err);
        }
        callback("success_init_Widget");
      });
      fs.mkdir(pathApp, function(err) {
        if (err) {
          console.log(err);
        }
        callback("success_app");
      });
      fs.mkdir(pathDesk, function(err) {
        if (err) {
          console.log(err);
        }
        callback("success_desk");
      });
      fs.mkdir(pathDock, function(err) {
        if (err) {
          console.log(err);
        }
        callback("success_dock");
      });
    })
  } else {
    console.log("Not a linux system! Not supported now!")
  }
}
exports.initConf = initConf;

/*
//TODO:
//This part is not completed,the logic needs to be modified.

function buildHelper(callback, sAppPath, sOriginPath, isEnd) {
  if (isEnd) {
    console.log("endddddddddddddddddddddddddddddddddddddd");
    callback("build desktop file end");
  } else if (sOriginPath == "") {
    return;
  }

  function parseDesktopFileCb(attr) {
    var sAttr = JSON.stringify(attr, null, 4);
    var nameindex = sOriginPath.lastIndexOf('/');
    var itemFilename = sOriginPath.substring(nameindex + 1, sOriginPath.length);
    sAppPath = sAppPath + itemFilename;
    fs.writeFile(sAppPath, sAttr, function(err) {
      if (err) {
        console.log("build desktop file error!");
        console.log(err);
      }
    })
  }
  parseDesktopFile(parseDesktopFileCb, sOriginPath);
}

function buildLocalDesktopFile(callback) {
  if (typeof callback !== 'function')
    throw 'Bad type of callback!!';
  var sAppPath = config.RESOURCEPATH + '/.desktop/application/';
  var tag = 0;

  function findAllDesktopFilesCb(oAllDesktopFiles) {
    for (var i = 0; i < oAllDesktopFiles.length; i++) {
      var sOriginPath = oAllDesktopFiles[i];
      var isEnd = (tag == oAllDesktopFiles.length - 1);
      console.log(oAllDesktopFiles.length + " : " + tag + " " + isEnd);
      buildHelper(callback, sAppPath, sOriginPath, isEnd);
      tag++;
    }
  }
  findAllDesktopFiles(findAllDesktopFilesCb);
}*/


/** 
 * @Method: readThemeConf
 *    read file Theme.conf
 *
 * @param: callback
 *    @result
 *        object
 *
 *    result example:
 *    {
 *       "icontheme": {
 *           "name": "Mint-X",
 *           "active": true,
 *           "icon": null,
 *           "path": "$HOME",
 *           "id": "computer",
 *           "pos": {
 *               "x": null,
 *               "y": null
 *           }
 *       },
 *     "computer": {
 *           ...
 *           }
 *          ...
 *    }
 *
 **/
function readThemeConf(callback) {
  var systemType = os.type();
  if (systemType === "Linux") {
    var ThemeConfPath = config.RESOURCEPATH + "/.desktop/Theme.conf";
    fs.readFile(ThemeConfPath, 'utf8', function(err, data) {
      if (err) {
        console.log("read Theme config file error!");
        console.log(err);
        return;
      } else {
        var json = JSON.parse(data);
        callback(json);
      }
    });
  } else {
    console.log("Not a linux system! Not supported now!")
  }
}
exports.readThemeConf = readThemeConf;



/** 
 * @Method: writeThemeConf
 *    modify file Theme.conf
 *
 * @param: callback
 *      @result
 *      string, retrive "success" when success
 *
 * @param: oTheme
 *    object, only content that needs to be modified
 *
 *    oThem example:
 *    var oTheme =
 *    {
 *       "icontheme": {
 *           "name": "Mint-X",
 *           "active": true,
 *           "icon": null,
 *           "path": "$HOME",
 *           "id": "computer",
 *           "pos": {
 *               "x": null,
 *               "y": null
 *           }
 *       },
 *     "computer": {
 *           ...
 *           }
 *          ...
 *    }
 *
 *
 **/
function writeThemeConf(callback, oTheme) {
  var systemType = os.type();
  if (systemType === "Linux") {
    var ThemeConfPath = config.RESOURCEPATH + "/.desktop/Theme.conf";
    var path = config.RESOURCEPATH + "/.desktop";
    fs.readFile(ThemeConfPath, 'utf-8', function(err, data) {
      if (err) {
        console.log(err);
        return;
      }
      var oData = JSON.parse(data);
      for (var k in oTheme) {
        oData[k] = oTheme[k];
      }
      var sTheme = JSON.stringify(oData, null, 4);
      fs.writeFile(ThemeConfPath, sTheme, function(err) {
        if (err) {
          console.log("write Theme config file error!");
          console.log(err);
        } else {
          var currentTime = (new Date());
          config.riolog("time: " + currentTime);
          var attrs = {
            lastAccessTime: currentTime,
            lastModifyTime: currentTime,
            lastAccessDev: config.uniqueID
          }
          var chItem = ThemeConfPath;
          var itemDesPath = path.replace(/\/resources\//, '/resources/.des/');
          dataDes.updateItem(chItem, attrs, itemDesPath, function() {
            callback("success");
          });
        }
      });
    })
  } else {
    console.log("Not a linux system! Not supported now!")
  }
}
exports.writeThemeConf = writeThemeConf;

/** 
 * @Method: readWidgetConf
 *    read file Widget.conf
 *
 * @param: callback
 *    @restult
 *        object
 *
 *    result example:
 *    {
 *       "icontheme": {
 *           "name": "Mint-X",
 *           "active": true,
 *           "icon": null,
 *           "path": "$HOME",
 *           "id": "computer",
 *           "pos": {
 *               "x": null,
 *               "y": null
 *           }
 *       },
 *     "computer": {
 *           ...
 *           }
 *          ...
 *    }
 *
 **/
function readWidgetConf(callback) {
  var systemType = os.type();
  if (systemType === "Linux") {
    var WidgetConfPath = config.RESOURCEPATH + "/.desktop/Widget.conf";
    fs.readFile(WidgetConfPath, 'utf8', function(err, data) {
      if (err) {
        console.log("read Theme config file error!");
        console.log(err);
        return;
      } else {
        var oJson = JSON.parse(data);
        console.log(oJson);
        callback(oJson);
      }
    });
  } else {
    console.log("Not a linux system! Not supported now!")
  }

}
exports.readWidgetConf = readWidgetConf;

/** 
 * @Method: writeThemeConf
 *    modify file Theme.conf
 *
 * @param: callback
 *    @result
 *        string, Retrive "success" when success
 *
 * @param: oTheme
 *    object, content of Widget.conf after modified
 *
 **/
function writeWidgetConf(callback, oWidget) {
  var systemType = os.type();
  if (systemType === "Linux") {
    var sWidget = JSON.stringify(oWidget, null, 4);
    var WidgetConfPath = config.RESOURCEPATH + "/.desktop/Widget.conf";
    var path = config.RESOURCEPATH + "/.desktop";
    fs.readFile(WidgetConfPath, 'utf-8', function(err, data) {
      if (err) {
        console.log(err);
        return;
      }
      var oData = JSON.parse(data);
      for (var k in oWidget) {
        oData[k] = oWidget[k];
      }
      var sWidget = JSON.stringify(oData, null, 4);
      fs.writeFile(WidgetConfPath, sWidget, function(err) {
        if (err) {
          console.log("write Widget config file error!");
          console.log(err);
        } else {
          var currentTime = (new Date());
          config.riolog("time: " + currentTime);
          var attrs = {
            lastAccessTime: currentTime,
            lastModifyTime: currentTime,
            lastAccessDev: config.uniqueID
          }
          var chItem = WidgetConfPath;
          var itemDesPath = path.replace(/\/resources\//, '/resources/.des/');
          dataDes.updateItem(chItem, attrs, itemDesPath, function() {
            callback("success");
          });
        }
      });
    })
  } else {
    console.log("Not a linux system! Not supported now!")
  }

}
exports.writeWidgetConf = writeWidgetConf;

/** 
 * @Method: readDesktopFile
 *   find a desktop file with name of sFilename
 *
 * @param1: callback
 *    @result
 *        object
 *
 *    result example:
 *    {
 *      Type: Application
 *      Name: Cinnamon
 *      Comment: Window management and application launching
 *      Exec: /usr/bin / cinnamon - launcher
 *      X - GNOME - Bugzilla - Bugzilla: GNOME
 *      X - GNOME - Bugzilla - Product: cinnamon
 *      X - GNOME - Bugzilla - Component: general
 *      X - GNOME - Bugzilla - Version: 1.8.8
 *      Categories: GNOME;GTK;System;Core;
 *      OnlyShowIn: GNOME;
 *      NoDisplay: true
 *      X - GNOME - Autostart - Phase: WindowManager
 *      X - GNOME - Provides: panel;windowmanager;
 *      X - GNOME - Autostart - Notify: true
 *      X - GNOME - AutoRestart: true
 *    }
 *
 * @param2: sFileName
 *    string,name of target file ,suffix is not required
 *    example: var sFileName = 'cinnamon';
 *
 **/
function readDesktopFile(callback, sFileName) {
  var systemType = os.type();
  if (systemType === "Linux") {
    function findDesktopFileCb(result) {
      if (result === "Not found" || result == "") {
        console.log("desktop file NOT FOUND!");
        return;
      } else {
        function parseDesktopFileCb(attr) {
          callback(attr);
        }
        var sPath = result;
        parseDesktopFile(parseDesktopFileCb, sPath);
      }
    }
    var sFullName = sFileName + ".desktop";
    findDesktopFile(findDesktopFileCb, sFullName)
  } else {
    console.log("Not a linux system! Not supported now!")
  }

}
exports.readDesktopFile = readDesktopFile;

/** 
 * @Method: parseDesktopFile
 *    parse Desktop File into json object
 *
 * @param1: sPath
 *    string, taget .desktop file path as: '/usr/share/applications/cinnamon.desktop'
 *
 * @param2: callback
 *    @result
 *        object
 *
 *    result example:
 *    {
 *      Type: Application
 *      Name: Cinnamon
 *      Comment: Window management and application launching
 *      Exec: /usr/bin / cinnamon - launcher
 *      X - GNOME - Bugzilla - Bugzilla: GNOME
 *      X - GNOME - Bugzilla - Product: cinnamon
 *      X - GNOME - Bugzilla - Component: general
 *      X - GNOME - Bugzilla - Version: 1.8.8
 *      Categories: GNOME;GTK;System;Core;
 *      OnlyShowIn: GNOME;
 *      NoDisplay: true
 *      X - GNOME - Autostart - Phase: WindowManager
 *      X - GNOME - Provides: panel;windowmanager;
 *      X - GNOME - Autostart - Notify: true
 *      X - GNOME - AutoRestart: true
 *    }
 *
 *
 **/
function parseDesktopFile(callback, sPath) {
  if (typeof callback !== 'function')
    throw 'Bad type of callback!!';

  var systemType = os.type();
  if (systemType === "Linux") {
    fs.readFile(sPath, 'utf-8', function(err, data) {
      if (err) {
        console.log("read desktop file error");
        console.log(err);
        return;
      } else {
        data = data.replace(/[\[]{1}[a-z, ,A-Z]*\]{1}\n/g, '$').split('$');
        var lines = data[1].split('\n');
        var attr = {};
        for (var i = 0; i < lines.length - 1; ++i) {
          var tmp = lines[i].split('=');
          attr[tmp[0]] = tmp[1];
          for (var j = 2; j < tmp.length; j++)
            attr[tmp[0]] += '=' + tmp[j];
        }
        console.log("Get desktop file successfully");
        callback(attr);
      }
    });
  } else {
    console.log("Not a linux system! Not supported now!")
  }
}

/** 
 * @Method: findDesktopFile
 *    find a desktop file with name of sFilename
 *
 * @param1: callback
 *    @result
 *    string, a full path string, as: '/usr/share/applications/cinnamon.desktop'
 *
 * @param2: sFileName
 *    string, a file name
 *    exmple: var sFileName = 'cinnamon.desktop';
 *
 **/
function findDesktopFile(callback, sFileName) {
  if (typeof callback !== 'function')
    throw 'Bad type for callback';
  var systemType = os.type();
  if (systemType === "Linux") {
    var xdgDataDir = [];
    var exec = require('child_process').exec;
    exec('echo $XDG_DATA_DIRS', function(err, stdout, stderr) {
      if (err) {
        console.log(stderr)
        console.log(err);
        return;
      } else {
        xdgDataDir = stdout.substr(0, stdout.length - 1).split(':');
        for (var i = 0; i < xdgDataDir.length; ++i) {
          xdgDataDir[i] = xdgDataDir[i].replace(/[\/]$/, '');
        }

        function tryInThisPath(callback, index) {
          if (index == xdgDataDir.length) {
            callback('Not found');
            return;
          }

          exec('sudo find ' + xdgDataDir[index] + ' -name ' + sFileName, function(err, stdout, stderr) {
            if (err) {
              console.log(stderr);
              console.log(err);
              return;
            }
            if (stdout == '') {
              tryInThisPath(callback, index + 1);
            } else {
              console.log('find ' + xdgDataDir[index] + ' -name ' + sFileName)
              var result = stdout.split('\n');
              callback(result[0]);
            }
          })
        };
        tryInThisPath(callback, 0);
      }
    })
  } else {
    console.log("Not a linux system! Not supported now!")
  }

}

/** 
 * @Method: findAllDesktopFiles
 *    find all .desktop files in system
 *
 * @param: callback
 *    @result
 *    object, an array of all desktop file's full path
 *
 *    example:
 *        [
 *         "/usr/share/xfce4/helpers/urxvt.desktop",
 *         "/usr/share/xfce4/helpers/lynx.desktop",
 *         "/usr/share/xfce4/helpers/rodent.desktop",
 *         "/usr/share/xfce4/helpers/icecat.desktop",
 *         "/usr/share/xfce4/helpers/pcmanfm.desktop",
 *         "/usr/share/xfce4/helpers/mozilla-browser.desktop",
 *        ]
 *
 **/
function findAllDesktopFiles(callback) {
  if (typeof callback !== 'function')
    throw 'Bad type for callback';
  var systemType = os.type();
  if (systemType === "Linux") {
    var xdgDataDir = [];
    var exec = require('child_process').exec;
    var oAllDesktop = [];
    exec('echo $XDG_DATA_DIRS', function(err, stdout, stderr) {
      if (err) {
        console.log(stderr)
        console.log(err);
        return;
      } else {
        xdgDataDir = stdout.substr(0, stdout.length - 1).split(':');
        for (var i = 0; i < xdgDataDir.length; ++i) {
          xdgDataDir[i] = xdgDataDir[i].replace(/[\/]$/, '');
        }

        function tryInThisPath(callback, index) {
          if (index == xdgDataDir.length) {
            callback(oAllDesktop);
          } else {
            var sTarget = '*.desktop';
            exec('sudo find ' + xdgDataDir[index] + ' -name ' + sTarget, function(err, stdout, stderr) {
              if (err) {
                console.log(stderr);
                console.log(err);
                return;
              }
              oAllDesktop = oAllDesktop.concat(stdout.split('\n'))
              tryInThisPath(callback, index + 1);
            })
          }
        };
        tryInThisPath(callback, 0);
      }
    })
  } else {
    console.log("Not a linux system! Not supported now!")
  }
}
exports.findAllDesktopFiles = findAllDesktopFiles;


/** 
 * @Method: writeDesktopFile
 *    modify a desktop file
 *
 * @param1: callback
 *    @result
 *    string, a full path string,
 *            as: '/usr/share/applications/cinnamon.desktop'
 *
 * @param2: sFileName
 *    string, a file name
 *    exmple: var sFileName = 'cinnamon.desktop';
 *
 * @param3: oEntries
 *    object, this object indludes those entries that you want
 *            to change in this desktop file.
 *
 *    example:
 *    var oEntries =
 *    {
 *      Comment: Window management and application launching of Mac OX X,
 *      NoDisplay: false
 *    }
 *
 **/
/*
//TODO:
//This part is not completed,the logic needs to be modified.
function writeDesktopFile(callback, sFileName, oEntries) {
  if (typeof callback !== 'function')
    throw 'Bad type of callback!!';

  function findDesktopFileCb(result) {
    function parseDesktopFileCb(attr) {
      attr = JSON.stringify(attr, null, 4);
      fs.writeFileSync('/home/xiquan/testFile/testWrite.txt', attr);
      callback(attr);
    }
    var sPath = result;
    parseDesktopFile(parseDesktopFileCb, sPath);
  }
  findDesktopFile(findDesktopFileCb, sFileName)
}
exports.writeDesktopFile = writeDesktopFile;*/