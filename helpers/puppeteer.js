const puppeteer=require('puppeteer');

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
  


module.exports = async function getContent(url){
    try{
        const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);
        const page = await browser.newPage(PAGE_PUPPETEER_OPTS);
        await page.goto(url,PAGE_PUPPETEER_OPTS);
        const content = await page.content();
        await page.click('#moreMonthEventsBtn');
        await page.screenshot({path: 'google.png', fullPage: true}); 
        browser.close();

        return content;
        
    } catch (err){
        throw err
    }
}