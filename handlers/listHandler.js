var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const getContent = require('../helpers/puppeteer');
const hasPriority = require('../helpers/common');

module.exports = listHandler = async function (data){
    try{
        console.log('lh start');
        for (const elem of data) {
            const description = await getContent(elem.link,data);
            elem.price?elem.priority=await hasPriority(description):elem.priority=false;
            if(elem.priority){
                io.emit('message', elem);
                console.log(elem);
            }else{
                console.log(elem.title, 'false');
            }
        }
        return data;
    } catch (err){
        throw err;
    }
}