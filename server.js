var http = require('http');
var fs = require('fs');
var url = require('url');
var port = process.argv[2];
console.log(JSON.stringify(process.argv), '12313213123');
if(!port){
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function(request, response){
    var parsedUrl = url.parse(request.url, true);
    var pathWithQuery = request.url;
    var queryString = ''
    //判断url中的参数
    if(pathWithQuery.indexOf('?') >= 0){ 
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) 
    }
    var path = parsedUrl.pathname
    var query = parsedUrl.query

    response.statusCode = 200;
    //默认首页
    const filePath = path === "/" ? 'index.hmtl' : path;
    const index = filePath.lastIndexOf('.');
    //截取路径的后缀
    const suffix = filePath.substring(index);
    //设置hash表来取出对应文件后缀的 content-type
    const fileTypes = {
        '.html':'text/html',
        '.css':'text/css',
        '.js':'text/javascript',
        '.png':'image/png',
        '.jpg':'image/jpeg'
    }
    response.setHeader('Content-Type', `${fileTypes[suffix] || 'text/html'};charset=utf-8`)
    let content
    try {
        content = fs.readFileSync(`./public${filePath}`)
    } catch (error){
        content = "文件不存在"
        response.statusCode = 404
    }
    response.write(content)
    response.end()
})

server.listen(port)
console.log('监听' + port + '成功打开 http://localhost:' + port)