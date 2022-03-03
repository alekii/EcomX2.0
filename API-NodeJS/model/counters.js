const mongoose = require('mongoose')

const countersSchema = new mongoose.Schema({
    _id:{
        type:String
    },
    sequence_value:{
        type:Number
    }
})



const Counters = mongoose.model('Counters',countersSchema)


const sequenceDocument = (sequenceName)=>{
  return new Promise((resolve,reject)=>{  
    Counters.findOneAndUpdate(
     {"_id":sequenceName},
     {$inc:{"sequence_value":1}}, 
     (error,counter) => {
         if(error){
             reject(error);
         }
         if(counter){  
               resolve(counter.sequence_value+1);

         } else {
             resolve(null)
         }
    }) 
})
}

const insertCounter = (sequenceName) => {
    const newCounter = new Counters({ _id: sequenceName, sequence_value: 1 });
    return new Promise((resolve, reject) => {
    newCounter.save()
        .then(data => { 
            resolve(data.sequence_value);
        })
        .catch(err => reject(err));
    });
}


exports.Counters = Counters
exports.sequenceDocument = sequenceDocument

exports.insertCounter = insertCounter

