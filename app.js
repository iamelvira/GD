const getContent = require('./helpers/puppeteer');
const listHandler = require('./handlers/listHandler');

module.exports= main = async function (url, socket){
    try{
        console.log('Start parsing main page');
        let elems = await getContent(url);
        listHandler(elems,socket);
        
    } catch(e) {
        console.log(e);
    }
};