global.$ = $;

//console.log(global.__dirname);
//console.log(global.__filename);
//console.log("path:" + process.cwd());
var sbar = require("side_bar.js");//./file-explorer/node_modules/
var abar = require("address_bar.js");//./file-explorer/node_modules/
var folder_view = require('folder_view.js');//./file-explorer/node_modules/
//var path = require('path');
//var shell = require('nw.gui').Shell;

//    function get_data(text){
//	console.log('data from server:', text);
//    }
$(document).ready(function() {
    //getAllCate(get_data);
    var sidebar = new sbar.SideBar($('#sidebar'));
	var folder = new folder_view.Folder($('#files'), $('#sidebar'));
	var addressbar = new abar.AddressBar($('#addressbar'));

	folder.open('root');//process.cwd()
	addressbar.set('root');//

	folder.on('navigate', function(mime) {
		if (mime['props'].type == 'folder') {
		    sidebar.set_favorites_focus(mime);
			addressbar.enter(mime);
		} else {
			//shell.openItem(mime.path);
			var file_propery='';
		    for(var key in mime){
			    file_propery += key + ':' + mime[key] + '\n';
		    }
		    alert(file_propery);
		}
	});
	folder.on('folder_set_favorites', function(dirs) {
	    sidebar.set_favorites(dirs);
	});
	folder.on('folder_set_sidebar', function(dirs){
        sidebar.set_tags(dirs);
        sidebar.set_filters(dirs);
        sidebar.set_recent(dirs);
    });
    
	sidebar.on('open_favorite', function(dir) {
//	    console.log('on open_favorite');
		folder.open(dir);
		addressbar.set(dir);
	});
    sidebar.on('do_filter', function(dir, keyword) {
        console.log('wangyu: on do_filter.');
        sidebar.do_filter(dir, keyword);
    });
    sidebar.on('show_filter_result', function(dir) {
        folder.open(dir);
    });
	addressbar.on('navigate', function(dir) {
		folder.open(dir);
	});
});