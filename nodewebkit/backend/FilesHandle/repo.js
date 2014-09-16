var path = require('path');
var git = require("nodegit");
var config = require("../config");
var filesHandle = require("../filesHandle");
var events = require('events'); 

exports.repoInit = function (repoPath,callback)
{
  git.Repo.init(repoPath,false,function(initReporError, repo){
    if (initReporError) 
      throw initReporError;
    console.log("Repo init : "+repo);
    var  exec = require('child_process').exec;
    var comstr = 'cd ' + repoPath + ' && git add . && git commit -m "Init"';
    console.log("runnnnnnnnnnnnnnnnnnnnnnnnnn"+comstr);
    exec(comstr, function(error,stdout,stderr){
      if(error){
        callback("Git init error");
      }
      else{
        filesHandle.monitorFiles(repoPath,filesHandle.monitorFilesCb);
        callback("success");
      }
    });
  });  
}

exports.repoAddCommit = function (repoPath,sourceFilePath,desFilePath,callback)
{
  var  exec = require('child_process').exec;
  var comstr = 'cd ' + repoPath + ' && git add '+sourceFilePath +' && git add '+desFilePath +' && git commit -m "Add : '+sourceFilePath+' and description file."';
  console.log("runnnnnnnnnnnnnnnnnnnnnnnnnn:\n"+comstr);
  exec(comstr, function(error,stdout,stderr){
    if(error){
      console.log("Git add error");
    }
    else{
      console.log("Git add success");
      callback();
    }
  });
}

exports.repoRmCommit = function (repoPath,sourceFilePath,desFilePath,callback)
{
  var  exec = require('child_process').exec;
  var comstr = 'cd ' + repoPath + ' && git rm '+sourceFilePath +' && git rm '+desFilePath +' && git commit -m "Delete : '+sourceFilePath+' and description file."';
  console.log("runnnnnnnnnnnnnnnnnnnnnnnnnn:\n"+comstr);
  exec(comstr, function(error,stdout,stderr){
    if(error){
      console.log("Git rm error");
    }
    else{
      console.log("Git rm success");
      callback();
    }
  });
}

exports.repoChCommit = function (repoPath,sourceFilePath,desFilePath,callback)
{
  var  exec = require('child_process').exec;
  var comstr = 'cd ' + repoPath + ' && git add '+sourceFilePath +' && git add '+desFilePath +' && git commit -m "Change : '+sourceFilePath+' and description file."';
  console.log("runnnnnnnnnnnnnnnnnnnnnnnnnn:\n"+comstr);
  exec(comstr, function(error,stdout,stderr){
    if(error){
      console.log("Git add error");
    }
    else{
      console.log("Git add success");
      callback();
    }
  });
}

exports.getLatestCommit = function (repoPath,callback)
{
  console.log("getLatestCommit "+repoPath);
  //open a git repo
  git.Repo.open(path.resolve(repoPath+'/.git'), function(openReporError, repo) {
  if (openReporError) 
    throw openReporError;
  console.log("Repo open : "+repo);  
  //add the file to the index...
  repo.openIndex(function(openIndexError, index) {
    if (openIndexError) 
      throw openIndexError;
    console.log("Repo index : "+index);
    index.read(function(readError) {
      if (readError) 
        throw readError;  
      console.log("Repo read : success");
      index.writeTree(function(writeTreeError, oid) {
        if (writeTreeError) 
          throw writeTreeError;
        console.log("Repo writeTree : success");
        //get HEAD 
          git.Reference.oidForName(repo, 'HEAD', function(oidForName, head) {
            if (oidForName) 
              throw oidForName;
            console.log("Repo oidForName : "+oidForName);
            //get latest commit (will be the parent commit)
            callback(head);
          });  
        });
      });  
    });
  });
}

exports.repoMergeForFirstTime = function (name,branch,address,path)
{
  filesHandle.watcherStop();
  var dataDir=require(config.USERCONFIGPATH+"config.js").dataDir;
  var cp = require('child_process');
  var cmd = 'cd '+dataDir+'&& git remote add '+name+' '+address+':'+path;
  console.log(cmd);
  cp.exec(cmd,function(error,stdout,stderr){
    console.log(stdout+stderr);
    var cmd = 'cd '+dataDir+'&& git fetch '+name;
    console.log(cmd);
    cp.exec(cmd,function(error,stdout,stderr){
      console.log(stdout+stderr);
      var cmd = 'cd '+dataDir+'&& git checkout -b '+branch+' '+name+'/master';
      cp.exec(cmd,function(error,stdout,stderr){
        console.log(stdout+stderr);
        var cmd = 'cd '+dataDir+'&& git checkout master && git merge '+branch;
        cp.exec(cmd,function(error,stdout,stderr){
          console.log(stdout+stderr);
          filesHandle.watcherStart(dataDir,filesHandle.monitorFilesCb);
        });
      });
    });
  });
}
