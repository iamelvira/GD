const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const main = require('./app.js');

app.set('view engine', 'ejs');

let url='https://kharkov.internet-bilet.ua/#all-events';


app.get('/', function(req, res){
    res.render('index');
});

io.on('connection', function(socket){
    socket.on('message', function(msg){
        console.log('Socket start: ',msg);
        main(url,socket);
    });
});


http.listen(8000, console.log('\n \n * Server started port 8000 *\n \n'));



