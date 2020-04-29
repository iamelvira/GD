const cheerio=require('cheerio');

const getContent = require('./helpers/puppeteer');
const listHandler = require('./handlers/listHandler');


let url='https://kharkov.internet-bilet.ua/#all-events';

(async function main(){
    try{
        const elems= await getContent(url);
        
        console.log(elems.length);

        const elems2=await listHandler(elems);
        console.log(elems2[15]);
        
    } catch (err){
        console.log(err);

    }
})()