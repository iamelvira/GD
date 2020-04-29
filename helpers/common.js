module.exports = async function hasPriority(str){
    try{
        const priority = ['кино', 'Губерман', 'стэндап', 'рок', 'Бумбокс','Чайковский', 'Акколаи', 'Шуманн','Schumann','stand up', 'Stand Up', 'Muse', 'Слин', 'Антитела'];

        for (const item of priority){
            if (str.includes(item)){
                return true;
            }
        }

        return false;
    }catch(err){
        throw err;
    }
}



