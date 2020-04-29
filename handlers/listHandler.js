
const getContent = require('../helpers/puppeteer');
const hasPriority = require('../helpers/common');

module.exports = async function listHandler(data){
    try{
        for (const elem of data) {
            const description = await getContent(elem.link,data);
            elem.priority=await hasPriority(description);
        }
        return data;
    } catch (err){
        throw err;
    }
}