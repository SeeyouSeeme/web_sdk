var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle['/web/'] = requestHandlers.get_js;
handle['/web/e.gif'] = requestHandlers.listen_event;
handle['/web/i.gif'] = requestHandlers.listen_user;
handle['/web/wm.js'] = requestHandlers.get_js;
server.start(router.route,handle);
