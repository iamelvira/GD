const cheerio=require('cheerio');
const getContent = require('../helpers/puppeteer');
const hasPriority = require('../helpers/common');

module.exports = async function listHandler(data){
    try{
        for (const elem of data) {
            const fullContent = await getContent(elem.link);
            let $=cheerio.load(fullContent);
            const description = $("span[itemprop='name']").text();
            let priority=await hasPriority(description);
            console.log(description);
        }
    } catch (err){
        throw err;
    }
}