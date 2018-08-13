/**
 * @author lxp
 * @date 4-2-2014
 */

var logger = require('fluent-logger');

logger.configure('websdk', {
    host: '10.0.8.46',
    port: 1224,
    timeout: 3.0
});
module.exports = {
    events: function (time,app_id,host,referer,wmurl,ip,wmuid,wmsid,category,action,opt_label,opt_value) {
                var json = {"time":time,
                            "host":host,
                            "site_id":app_id,
                            "referer":referer,
            	            "wmurl":wmurl,
                            "ip":ip,
                            "wmuid":wmuid,
                            "wmsid":wmsid,
                            "category":category,
                            "action":action,
                            "opt_label":opt_label,
                            "opt_value":opt_value
                }
                logger.emit('events',json, function () {
                    console.log('add events success');
                });
    },
    user: function (time,app_id,ip,host,wmuid,wmsid,screen,referer,wmurl,useragent) {
                var json = {
                    "time":time,
                    "site_id":app_id,
                    "ip":ip,
                    "host":host,
                    "wmuid":wmuid,
                    "wmsid":wmsid,
                    "screen":screen,
                    "referer":referer,
        	        "wmurl":wmurl,
                    "useragent":useragent
                }
                logger.emit('user', json, function () {
                    console.log('add user success');
                });
    }
}

