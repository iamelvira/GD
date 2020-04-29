const getContent = require('./helpers/puppeteer');
const listHandler = require('./handlers/listHandler');



module.exports= main = async function (url){
    try{
        console.log('main start');
        let elems = await getContent(url);
        listHandler(elems);
        
    } catch (err){
        console.log(err);
    }
};