const puppeteer =require('puppeteer');
// const dataUpdate = require('../helpers/common');


module.exports = LAUNCH_PUPPETEER_OPTS = {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--window-size=13000x1080'
    ]
};
  
module.exports =  PAGE_PUPPETEER_OPTS = {
    networkIdle2Timeout: 5000,
    waitUntil: 'networkidle2',
    timeout: 3000000
};


const clickNextButton = async (page) => {
    await page.click('#moreMonthEventsBtn');
}

async function dataUpdate(page){
    try{
        let elems = [];
        const elementLinks = await page.$$('tr.all-events>td.info-item>div.event-title>a');
        for( let elementLink of elementLinks ) {
            elem={};
            elem.link = await page.evaluate(el => el.getAttribute('href'), elementLink);
            elem.title = await page.evaluate(el => el.getAttribute('title'), elementLink);
            elems.push(elem);  
        }
    return elems;
    }catch(err){
        throw err;
    }
}



module.exports = async function getContent(url,elems){
    try{
        const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);
        const page = await browser.newPage(PAGE_PUPPETEER_OPTS);
        await page.goto(url,PAGE_PUPPETEER_OPTS);
        let data;

        
        if(elems){
            data= '4558';
        }else{
            let nextBtnPresent = true;
            while (nextBtnPresent) {
                await clickNextButton(page);
                await new Promise(resolve => setTimeout(resolve, 1000));
                nextBtnPresent = (await page.$$('#moreMonthEventsBtn')).length > 0;
            }
            data = await dataUpdate(page);
        }
        
        browser.close();
        return data;
    } catch (err){
        throw err
    }
}