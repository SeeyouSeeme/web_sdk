/** 导入nodejs 自带http模块*/
var http = require("http");
/* url和querystring是Node.js自带模块*/ 
var url = require("url");
/** request 和 response 是两个对象
writeHead 和 write 是repsonse的两个方法*/
/* 用start方法把 onRquest方法 封装起来*/

function start(route,handle){
     /* request 和 response 是两个对象*/
    function onRequest(request, response) {
	/*通过request对象获到请求中pathname参数的值*/
  try{
    var deurl = decodeURIComponent(request.url);
  }catch(err){
    console.log(err+'>>>Server.start');
    return;
  }
    
	var pathname = url.parse(deurl).pathname;
//    var uri = decodeURIComponent(url.parse(request.url));
//   console.log(uri);return;
        /* response响应header */
	route(handle,pathname,request,response);
    }
    /** create服务器，兼听8888端口 **/
    http.createServer(onRequest).listen(10001);
    console.log("Server has started......");
}

/* 导出start这个函数 */
exports.start = start;
/* 我们need的everydata maybe include requery object this object for exmple 
  http://localhost:8888/start?foo=bar&hello=world
  url.parse(string).pathname = start
  url.parse(string).query = /start?foo=bar&hello=world
  querystring(string)['foo'] = bar
  querystring(string)['hello'] = world
*/
   
