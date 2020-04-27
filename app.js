const req= require('request'),
    cheerio=require('cheerio'),
    fs=require('fs');

let elems=[];
let url='https://kharkov.internet-bilet.ua/#all-events';
let path= 'file.json';

req (url,function(err,res,body){
    if(!err && res.statusCode===200) {
        console.log('succes');
        let $=cheerio.load(body);

        $('.event-title a').each(function(i){
            elems[i]={};
            elems[i].id=i;
            elems[i].link=this.attribs.href;
        });

        fs.writeFile(path, JSON.stringify(elems),(error)=>{
            if(error){
                console.log(error.message);
            };
            console.log('no error');
        })


    }else{
        console.log('no succes');  
    }
})