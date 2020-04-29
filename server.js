var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const main = require('./app.js')


app.set('view engine', 'ejs');


let url='https://kharkov.internet-bilet.ua/#all-events';

app.get('/', function(req, res){
    res.render('index');
});


io.on('connection', function(socket){
    socket.on('message', function(msg){
        console.log('socket start');
       main(url);
    });
});


http.listen(3000);



