module.exports = hasPriority = async function(str){
    try{
        const priority = ['кино ', 'Губерман', 'Рок', 'Бумбокс','Чайковск', 'Акколаи', 'Шуман','Schuman', 'Stand Up', 'STAND UP', 'Muse', 'Слин'];

        for (const item of priority){
            if (str.includes(item)){
                return true;
            }
        }

        return false;
    }catch(e) {
        console.log('Error in some unic identifier: \n', e);
      }
}



