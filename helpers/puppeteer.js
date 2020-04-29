const puppeteer =require('puppeteer');


LAUNCH_PUPPETEER_OPTS = {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--window-size=13000x1080'
    ]
};
PAGE_PUPPETEER_OPTS = {
    networkIdle2Timeout: 5000,
    waitUntil: 'networkidle2',
    timeout: 3000000
};


const clickNextButton = async (page) => {
    try{await page.click('#moreMonthEventsBtn');}catch(err){
        throw err;
    }
};

async function createData(page){
    try{
        let elems = [];
        const elementLinks = await page.$$('tr.all-events>td.info-item>div.event-title>a');
        const images = await page.$$('tr.all-events>td.img-item>a>img');
        const dates = await page.$$('tr.all-events>td.info-item>div.event-date');
        const prices = await page.$$('tr.all-events>td.price-item>strong>span');
        const len=images.length;
        for(let i=0; i<len; i++) {
            elems[i]={};
            elems[i].imgSrs='https://kharkov.internet-bilet.ua'+await page.evaluate(el => el.getAttribute('src'), images[i]);
            elems[i].link = await page.evaluate(el => el.getAttribute('href'), elementLinks[i]);
            elems[i].title = await page.evaluate(el => el.getAttribute('title'), elementLinks[i]);
            elems[i].date =  await page.evaluate(el => el.textContent, dates[i]);
            elems[i].price =  await page.evaluate(el => el.textContent, prices[i]);
        }

        return elems;

    }catch(err){
        throw err;
    }
};

async function updateData(page){
    try{
        let str='';
        const descriptions = await page.$$('ul.breadcrumbs-list>li>a>span');
        for( let sp of descriptions ) {
            let substr = await page.evaluate(el => el.textContent, sp);
            str+=substr;
        }
        return str;

    }catch(err){
        throw err;
    }
};



module.exports = getContent = async function (url,elems){
    try{
        const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);
        const page = await browser.newPage(PAGE_PUPPETEER_OPTS);
        await page.goto(url,PAGE_PUPPETEER_OPTS);
        let data;

        
        if(elems){
            data= await updateData(page);
        }else{
            let nextBtnPresent = true;
            while (nextBtnPresent) {
                await clickNextButton(page);
                await new Promise(resolve => setTimeout(resolve, 2000));
                nextBtnPresent = (await page.$$('#moreMonthEventsBtn')).length > 0;
            }
            data = await createData(page);
        }
        
        browser.close();
        return data;
    } catch (err){
        throw err
    }
}