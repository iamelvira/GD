const getContent = require('../helpers/puppeteer');
const hasPriority = require('../helpers/common');


module.exports = listHandler = async function (data, socket){
    try {
        console.log('Start parsing detail pages');
        let count=1;
        const amount=data.length;
        socket.emit('message', {
            type:'start',
            data:amount
        });
        for (const elem of data){

            const description = await getContent(elem.link,data);
            elem.price?elem.priority=await hasPriority(description):elem.priority=false;

            if (elem.priority){
                socket.emit('message', {
                    type: 'data',
                    count: count++,
                    data: elem
                });
            }else{
                console.log('NOT INTERESTING ', elem.title);
                socket.emit('message', {
                    type:'info',
                    data:count++
                });
            }
        }
        console.log('End parsing');
        socket.emit('message', {
            type:'end',
            data:'End parsing'
        });
        return data;
    } catch(e) {
        console.log(e);
    }
}