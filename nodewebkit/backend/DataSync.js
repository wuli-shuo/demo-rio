/**
 * @Title: DataSync.js
 * @Description: Function for data sync
 * @author: yuanzhe
 * @version: 0.0.1
 **/

 var msgTransfer = require("./msgtransfer");
 var commonDAO = require("./DAO/CommonDAO");
 var config = require("./config");
 //var HashTable = require('hashtable');

var ActionHistory = require('./DAO/ActionHistoryDAO');//

//Init method,retrive data from db
function syncInitActions(initCallback){
	console.log("init actions history!");

	commonDAO.findAllActionHistory(initCallback);
}

//Sync send message method
//@param Obj
//     turn to jsonStr
function syncSendMessage(address, msgObj){
	
	var msgStr = JSON.stringify(msgObj);
	msgTransfer.sendMsg(address,msgStr);
}

//Sync delete action
function syncDeleteAction(other_deleteHistory,deleteCallBack){
	commonDAO.findEachActionHistory("delete",function(my_deleteHistory){
		deleteCallBack(other_deleteHistory,my_deleteHistory);
	});
}

//Sync insert action
function syncInsertAction(other_insertHistory,insertCallBack){
	commonDAO.findEachActionHistory("insert",function(my_insertHistory){
		insertCallBack(other_insertHistory,my_insertHistory);
	});
}

//Sync insert action
function syncUpdateAction(other_updateHistory,updateCallBack){
	commonDAO.findEachActionHistory("update",function(my_updateHistory){
		updateCallBack(other_updateHistory,my_updateHistory);
	});
}

//Send sync request when other devices connect the net.
function syncRequest(address){
  // console.log("get address from internet discovery : " + address);
  var requestMsg = {
  	type: "syncRequest",
  	account: config.ACCOUNT
  };

  syncSendMessage(address[0],requestMsg);
}

//Confirm request
function syncResponse(msgObj, address){
	var resultValue = null;
	//ToDo something to confirm
	//example account , list for sync and so on... 
	resultValue = "OK";
	var responseMsg = {
		type: "syncResponse",
		account: config.ACCOUNT,
		result: resultValue
	};

//	var responseStr = JSON.stringify(responseMsg);
//	console.log(address);
syncSendMessage(address,responseMsg);
}

//Check Response
function syncCheckResponse(msgObj, address){
	//TODO check response
	if (typeof(msgObj.result) != "undefined" && msgObj.result == "OK") {
		//Get and transfer actions
		var insertActions = null;
		var deleteActions = null;
		var updateActions = null;
		//ActionHistory.test();//generate fake update hsitory for test
		syncInitActions(function(insertArray, deleteArray, updateArray){
			insertActions = insertArray;
			deleteActions = deleteArray;
			updateActions = updateArray;

			var syncDataObj = {
				type: "syncStart",
				account:config.ACCOUNT,
				insertActions: insertActions,
				deleteActions: deleteActions,
				updateActions: updateActions
			};

			syncSendMessage(address, syncDataObj);
		});
	};
}

//Start sync data
function syncStart(syncData, adress){
	//ActionHistory.test();
	var insertActions = syncData.insertActions;
	var deleteActions = syncData.deleteActions;
	var updateActions = syncData.updateActions;

	console.log("insert actions: " + JSON.stringify(insertActions));
	console.log("delete actions: " + JSON.stringify(deleteActions));
	console.log("update actions: " + JSON.stringify(updateActions));

	var deletetList = new Array();
	var insertList = new Array();
	var updateList = new Array();
	var conflictList = new Array();

	//Sync data, delete > insert > update
	syncDeleteAction(deleteActions,function(deleteActions,my_deleteHistory){
		console.log("==========start sync delete!!!==========");
		deleteActions.forEach(function(deleteItem){
			if(isExist(my_deleteHistory,deleteItem)){
				console.log('==========nothing new==========');
			}else{
				console.log("==========We got a new delete:==========");
				console.log(deleteItem);
				deletetList.push(deleteItem);
			};
		});
		console.log(deletetList);
		ActionHistory.createAll("delete",deletetList,function(){console.log("==========delete insert done!!!==========")});
        //remove some delete items in insertActions
		for(var i=0;i<my_deleteHistory.length;i++){
			for(var j=0;j<insertActions.length;j++){
				if(my_deleteHistory[i].dataURI === insertActions[j].dataURI)
					insertActions.splice(j,1);
			}
		}

		//Retrive actions after delete, start to sync insert actions 
		syncInsertAction(insertActions,function(insertActions,my_insertHistory){
			console.log("==========start sync insert!!!==========");
			insertActions.forEach(function(insertItem){
				if(isExist(my_insertHistory,insertItem)){
					console.log('==========nothing new==========');
				}else{
					console.log("==========We got a new insert:==========");
					console.log(insertItem);
					insertList.push(insertItem);
				};
			});
			console.log(insertList);
			ActionHistory.createAll("insert",insertList,function(){console.log("==========insert done!!!==========")});

			////Retrive actions after insert, start to sync update actions 
			syncUpdateAction(updateActions,function(updateActions,my_updateHistory){
				console.log("==========start sync update!!!==========");
				updateActions.forEach(function(updateItem){
					if(isExist(my_updateHistory,updateItem)){
						console.log('==========operate on the same file==========');
						console.log(updateItem);
						if(isConflict(my_updateHistory,updateItem))
							conflictList.push(updateItem);
						else
							updateList.push(updateItem);
					}else{
						console.log("==========We got a new update:==========");
						console.log(updateItem);
						updateList.push(updateItem);
					};
				});
				//
				console.log("==========here are conflicts==========")
				console.log(conflictList);
				//ActionHistory.createAll("update",updateList,function(){console.log("---insert update done!!!---")});
			});
		});
	});
}

//deal with the conflict situation 
function versionCtrl(){
    //to be continue ......

}

//check is exist or not
function isExist(List,item){
	var flag = false;
	List.forEach(function(listItem){
		if(item.dataURI === listItem.dataURI){
			flag = true;
		}
	});
	return flag;
}

//check the data is conflict or not
function isConflict(List,item){
	var flag = false;
	List.forEach(function(listItem){
		if(item.dataURI === listItem.dataURI && item.key === listItem.key){
			flag = true;
		}
	});
	return flag;
};

//Sync complete
function syncComplete(){
	//To-Do
}

//Export method
//exports.createHash = createHash;
//exports.getDiff = getDiff;
exports.syncStart = syncStart;
exports.syncRequest = syncRequest;
exports.syncResponse = syncResponse;
exports.syncCheckResponse = syncCheckResponse;