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

app.get('/dashboard', function (req, res) {
    index.getApp(function(data){
        res.render('dashboard', {});
    })
});

app.get('/detail', function(req, res) {
    var http_response = {};
    res.jsonp(http_response);
});

app.get('/list', function (req, res) {
    var index = 0;
    if(req.query && typeof req.query == 'object'){
        index = req.query.index || 0;
    };
    http_response = {
        hasMore: true,
        list: [
            {
               img_src: 'http://pavo.elongstatic.com/i/Hotel70_70/0000jAOR.jpg',
               pic_tag: '端午节大促',
               comt_no: 4.5,
               comt_nmb: 544,
               tag: '高铁管家返现金',
               price: 9999,
               price_old: 1234,
               district: {
                   start: '清华大学',
                   distance: 20
               },
               hotel: {
                  hotel_location: '北京',
                  hotel_mark: '清华大学',
                  hotel_name: '大酒店'
               },
               facilities: ['icon-parking', 'icon-wifi', 'icon-bra'],
               type: '经济型'
            },
            {
               img_src: 'http://pavo.elongstatic.com/i/Hotel70_70/0000jAOR.jpg',
               pic_tag: '端午节大促',
               comt_no: 4.5,
               comt_nmb: 544,
               tag: '高铁管家返现金',
               price: 9999,
               price_old: 1234,
               district: {
                   start: '清华大学',
                   distance: 20
               },
               hotel: {
                  hotel_location: '北京',
                  hotel_mark: '清华大学',
                  hotel_name: '大酒店'
               },
               facilities: ['icon-parking', 'icon-wifi', 'icon-bra'],
               type: '经济型'
            },
            {
               img_src: 'http://pavo.elongstatic.com/i/Hotel70_70/0000jAOR.jpg',
               pic_tag: '端午节大促',
               comt_no: 4.5,
               comt_nmb: 544,
               tag: '高铁管家返现金',
               price: 9999,
               price_old: 1234,
               district: {
                   start: '清华大学',
                   distance: 20
               },
               hotel: {
                  hotel_location: '北京',
                  hotel_mark: '清华大学',
                  hotel_name: '大酒店'
               },
               facilities: ['icon-parking', 'icon-wifi', 'icon-bra'],
               type: '经济型'
            },
            {
               img_src: 'http://pavo.elongstatic.com/i/Hotel70_70/0000jAOR.jpg',
               pic_tag: '端午节大促',
               comt_no: 4.5,
               comt_nmb: 544,
               tag: '高铁管家返现金',
               price: 9999,
               price_old: 1234,
               district: {
                   start: '清华大学',
                   distance: 20
               },
               hotel: {
                  hotel_location: '北京',
                  hotel_mark: '清华大学',
                  hotel_name: '大酒店'
               },
               facilities: ['icon-parking', 'icon-wifi', 'icon-bra'],
               type: '经济型'
            },
            {
               img_src: 'http://pavo.elongstatic.com/i/Hotel70_70/0000jAOR.jpg',
               pic_tag: '端午节大促',
               comt_no: 4.5,
               comt_nmb: 544,
               tag: '高铁管家返现金',
               price: 9999,
               price_old: 1234,
               district: {
                   start: '清华大学',
                   distance: 20
               },
               hotel: {
                  hotel_location: '北京',
                  hotel_mark: '清华大学',
                  hotel_name: '大酒店'
               },
               facilities: ['icon-parking', 'icon-wifi', 'icon-bra'],
               type: '经济型'
            },
            {
               img_src: 'http://pavo.elongstatic.com/i/Hotel70_70/0000jAOR.jpg',
               pic_tag: '端午节大促',
               comt_no: 4.5,
               comt_nmb: 544,
               tag: '高铁管家返现金',
               price: 9999,
               price_old: 1234,
               district: {
                   start: '清华大学',
                   distance: 20
               },
               hotel: {
                  hotel_location: '北京',
                  hotel_mark: '清华大学',
                  hotel_name: '大酒店'
               },
               facilities: ['icon-parking', 'icon-wifi', 'icon-bra'],
               type: '经济型'
            },
            {
               img_src: 'http://pavo.elongstatic.com/i/Hotel70_70/0000jAOR.jpg',
               pic_tag: '端午节大促',
               comt_no: 4.5,
               comt_nmb: 544,
               tag: '高铁管家返现金',
               price: 9999,
               price_old: 1234,
               district: {
                   start: '清华大学',
                   distance: 20
               },
               hotel: {
                  hotel_location: '北京',
                  hotel_mark: '清华大学',
                  hotel_name: '大酒店'
               },
               facilities: ['icon-parking', 'icon-wifi', 'icon-bra'],
               type: '经济型'
            },
            {
               img_src: 'http://pavo.elongstatic.com/i/Hotel70_70/0000jAOR.jpg',
               pic_tag: '端午节大促',
               comt_no: 4.5,
               comt_nmb: 544,
               tag: '高铁管家返现金',
               price: 9999,
               price_old: 1234,
               district: {
                   start: '清华大学',
                   distance: 20
               },
               hotel: {
                  hotel_location: '北京',
                  hotel_mark: '清华大学',
                  hotel_name: '大酒店'
               },
               facilities: ['icon-parking', 'icon-wifi', 'icon-bra'],
               type: '经济型'
            },
            {
               img_src: 'http://pavo.elongstatic.com/i/Hotel70_70/0000jAOR.jpg',
               pic_tag: '端午节大促',
               comt_no: 4.5,
               comt_nmb: 544,
               tag: '高铁管家返现金',
               price: 9999,
               price_old: 1234,
               district: {
                   start: '清华大学',
                   distance: 20
               },
               hotel: {
                  hotel_location: '北京',
                  hotel_mark: '清华大学',
                  hotel_name: '大酒店'
               },
               facilities: ['icon-parking', 'icon-wifi', 'icon-bra'],
               type: '经济型'
            }
          ],
        success:'true'
    };
    if(index>=3){
      http_response.hasMore = false;
    };
    res.jsonp(http_response);
});

http.listen(port);
console.log('Listening port:'+port);
