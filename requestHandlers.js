var url = require("url");
var qs = require('querystring');
var fs = require('fs');
var fluent = require('./fluent');

/**
 *监听web端行为事件方法
 *
 */

function listen_event(req,res){

    	var deurl = req.url;
    	var req_url = url.parse(deurl, true);
    	var wmuid = req_url.query.wmuid;
    	var wmsid = req_url.query.wmsid;
    	var category = req_url.query.category;
    	var action = req_url.query.action;
    	var opt_label = req_url.query.opt_label;
            opt_label = opt_label.replace(/\\/g,'');
    	var opt_value = req_url.query.opt_value;
    	var ip = req.headers['x-forwarded-for'] ||
                 req.connection.remoteAddress ||
                 req.socket.remoteAddress ||
                 req.connection.socket.remoteAddress;
    	var referer = req.headers['referer'];
    	var useragent = req.headers['user-agent'];
    	var host = req_url.query.wmhost;
    	var app_id = req_url.query.app_id; 
    	var app_error = check_app_id(app_id);
        var wmurl = 'listen_event_error_url_count';
        try{
            wmurl = unescape(decodeURIComponent(req_url.query.wmurl));
        }catch(err){
            console.log(err+'>>'+req_url.query.wmurl+'>>>listen_event')
            return;
        }
    	var SY = new Date().getFullYear(),
    	SM = new Date().getMonth()+1,
    	SD = new Date().getDate(),
    	SH = new Date().getHours(),
    	SI = new Date().getMinutes(),
    	SS = new Date().getSeconds();
        SM = SM < 10 ? ("0" + SM) : SM;
        SD = SD < 10 ? ("0" + SD) : SD;
    	var time = SY+'-'+SM+'-'+SD+' '+SH+':'+SI+':'+SS;
    	var img = fs.readFileSync('./img/1.gif');
        	res.writeHead(200, {'Content-Type': 'image/gif' });
        	res.end(img, 'binary');
    	//本地日志
    	if(app_error==true){
        	message = {time:time,app_id:app_id,host:host,referer:referer,wmurl:wmurl,ip:ip,wmuid:wmuid,wmsid:wmsid,category:category,action:action,opt_label:opt_label,opt_value:opt_value};   
        	jsonString = JSON.stringify(message);
            
                fs.appendFile("./log/event_"+SY+SM+SD+".log", jsonString+"\n", function(err){
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("The file was saved!");
                    }
                });    
           
        	fluent.events(time,app_id,host, referer,wmurl,ip, wmuid,wmsid,category,action,opt_label,opt_value);
    	}

}

/**
 *监听用户访问记录
 *
 */

function listen_user(req,res){
        var deurl = req.url;
        var req_url = url.parse(deurl, true);
        var wmuid = req_url.query.wmuid;
        var wmsid = req_url.query.wmsid;
        var screen =  req_url.query.screen;
        var ip = req.headers['x-forwarded-for'] ||
                 req.connection.remoteAddress ||
                 req.socket.remoteAddress ||
                 req.connection.socket.remoteAddress;
        var referer = req.headers['referer'];
        var useragent = req.headers['user-agent'];
        var host = req_url.query.wmhost;
        var wmurl = 'lisen_user_error_url_count';
        try{
            wmurl = unescape(decodeURIComponent(req_url.query.wmurl));
        }catch(err){
            console.log(err+'>>'+req_url.query.wmurl+'>>>listen_user')
            return;
        }
        var app_id = req_url.query.app_id;
        var app_error = check_app_id(app_id);
        var SY = new Date().getFullYear(),
        	SM = new Date().getMonth()+1,
        	SD = new Date().getDate(),
        	SH = new Date().getHours(),
        	SI = new Date().getMinutes(),
        	SS = new Date().getSeconds();
            SM = SM < 10 ? ("0" + SM) : SM;
            SD = SD < 10 ? ("0" + SD) : SD;

        var time = SY+'-'+SM+'-'+SD+' '+SH+':'+SI+':'+SS;
        var img = fs.readFileSync('./img/1.gif');
        res.writeHead(200, {'Content-Type': 'image/gif' });
        res.end(img, 'binary');
        if(app_error==true){
        	message = {time:time,app_id:app_id,ip:ip,host:host,wmuid:wmuid,wmsid:wmsid,screen:screen,referer:referer,wmurl:wmurl,useragent:useragent};
        	jsonString = JSON.stringify(message);
            
                fs.appendFile("./log/login_"+SY+SM+SD+".log", jsonString+"\n", function(err){
            		if(err) {
                		console.log(err);
            		} else {
                		console.log("The file was saved!");
        	    		}
                });
            
        	fluent.user(time,app_id,ip,host,wmuid,wmsid,screen,referer,wmurl,useragent);
        }
}

/**
 *web获取js文件
 *
 */

function get_js(req,res){
        var deurl = '';
        try{
            deurl = decodeURIComponent(req.url);
        }catch(err){
            console.log(err+'>>'+req.url+'>>>'+'get_js')
            res.writeHead(200, {'Content-Type': 'text/javascript' });
            res.end('error for app_id');
        }
        var req_url = url.parse(deurl, true);
        var app_id = req_url.query.app_id;
        var check = check_app_id(app_id);
        var fs = require('fs');
        var options =
            {
                'encoding':'utf8',
                'flag':'r'
            };
        if(check===true){
            fs.readFile('js/wmtj.js', options, function (err,data) {
                if (err) {
                    return console.log(err);
                }
                var result = data.replace(/APP_ID/g,app_id);
                res.writeHead(200, {'Content-Type': 'text/javascript'});
                res.end(result);
            });
        }else{
            res.writeHead(200, {'Content-Type': 'text/javascript' });
            res.end('error for app_id');
        }
}

/**
 *检测app_id
 *
 */

function check_app_id(app_id){
    var app_id_arr = new Array();
        app_id_arr[0] = "1-flk2uios3228e0rei0";
        app_id_arr[1] = "3-uwie7823rkjf2303r9";
        app_id_arr[2] = "3-piadjf34i3u3j39rsd";
        app_id_arr[3] = "3-dshjashfaieywejfjj";
    var check = in_array(app_id,app_id_arr);
    return check;    
}

/**
 *判断一个值是否在数组里
 *
 *
 */

function in_array(stringToSearch, arrayToSearch) {
    for (s = 0; s < arrayToSearch.length; s++) {
        thisEntry = arrayToSearch[s].toString();
        if (thisEntry == stringToSearch) {
            return true;
        }
    }
    return false;
}

exports.check_app_id = check_app_id;
exports.in_array = in_array;
exports.get_js = get_js;
exports.listen_event = listen_event;
exports.listen_user = listen_user;
