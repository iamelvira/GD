const cheerio=require('cheerio');

const getContent = require('./helpers/puppeteer');
const listHandler = require('./handlers/listHandler');

let url='https://kharkov.internet-bilet.ua/#all-events';

(async function main(){
    try{
        const pageContent= await getContent(url);
        let elems=[];

        let $=cheerio.load(pageContent);
        $('tr.all-events>td.info-item>div.event-title>a').each(function(i, name){
            elems[i]={};
            elems[i].link=$(name).attr('href');
            elems[i].title=$(name).attr('title');

        });
        console.log(elems.length);
        // await listHandler(elems);
        
    } catch (err){
        console.log(err.message);

    }
})()