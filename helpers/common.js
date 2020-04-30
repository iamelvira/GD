module.exports = hasPriority =  function (str){
    try{
        const priority = ['кино ', 'Губерман', 'Рок', 'Бумбокс','Чайковск', 'Акколаи', 'Шуман','Schuman', 'Stand Up', 'STAND UP', 'Muse', 'Сплин'];

        for (const item of priority){
            if (str.includes(item)){
                return true
            }
        }

        return false
    } catch(e){
        console.log(e)
    }
}



