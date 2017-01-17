var port = 8000;

var express = require('express');
var app = express();

var router = express.Router();
var template = require('art-template');
var http = require('http').Server(app);

template.config("cache",false);

app.engine('.html', template.__express);

//1. 静态资源服务器/public
app.use(express.static(__dirname + '/public',{etag: false,maxAge:0}));

//2. 模板 /views
app.set('views', __dirname+'/views');
app.set('view engine', 'html');

var index = require("./routes/index");

app.get('/app*', function (req, res) {
    index.getApp(function(data){
        res.render('index', {data: data, data2: ['a', 'b']});
    })
});

http.listen(port);
console.log('Listening port:'+port);
