var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const getContent = require('../helpers/puppeteer');
const hasPriority = require('../helpers/common');

module.exports = listHandler = async function (data, socket){
    try{
        console.log('Start parsing detail pages');;
        for (const elem of data) {
            const description = await getContent(elem.link,data);
            elem.price?elem.priority=await hasPriority(description):elem.priority=false;
            if(elem.priority){
                socket.emit('message', elem);
            }else{
                console.log('NOT INTERESTING ', elem.title);
            }
        }
        console.log('Parsing end');
        return data;
    } catch(e) {
        console.log('Error in some unic identifier: \n', e);
      }
}