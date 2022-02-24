var http = require('http'); //用来启服务
var fs = require('fs'); //用来读取文件
var root = "C:/Users/Administrator/Desktop/Autumn/运行环境/安全/csrf攻击/csrf/" //你本地放index.html页面的文件路径
//开启服务
var server = http.createServer(function (req, res) {
    var url = req.url;
    let length = url.length
    let tmp = ''
    for (let i = 0; i < length; i++) {
        if (url[i] == '?') {
            break
        }
        tmp = tmp + url[i]
    }
    var file = root + tmp;
    fs.readFile(file, function (err, data) {
        if (err) {
            res.writeHeader(404, {
                'content-type': 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        } else {
            res.writeHeader(200, {
                'content-type': 'text/html;charset="utf-8"'
            });
            res.write(data);//将index.html显示在客户端
            res.end();

        }
    })
})
server.listen(5000); //端口号
console.log('服务器开启成功');