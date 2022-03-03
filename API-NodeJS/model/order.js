 const mongoose = require("mongoose"); 

 const {User} = require("./users")
 const {Product} = require("./product")
 const {Counter,sequenceDocument,insertCounter} = require("./counters");
const string = require("joi/lib/types/string");

const orderSchema = new mongoose.Schema({ 
    user:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User '
    },
    orderID:{
        type:Number,
 },
    orderComplete:{
        type:Boolean, 
        default:false
    },
    shipmentInfo: [
            {
                firstName:{
                    type:String,
                    required:true,

                },lastName:{
                    type:String,
                    required:true,

                },town:{
                    type:String,
                    required:true,

                },county:{
                    type:String,
                    required:true,

                },
            }
    ],
    orderItems:[ 
        { 
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product'
            },
            quantity:{
                type:Number,
                default:1
            } 
        }
    ],
    orderAmount:{
        type:Number, 
        
    },
    createdAt: {
       type:Date,
       default:Date.now
    }
}) 
     orderSchema.pre("save", function(next){
      let doc = this
       sequenceDocument("orderID")
      .then(counter =>{ 
          if(!counter) { 
            insertCounter("orderID")
                        .then(counter => {
                            doc.orderID = counter; 
                            next();
                        })
                        .catch(error => next(error))
                    } else 
                    doc.orderID = counter; 
           next()
      }).catch(error => next(error))
  })


const Order = mongoose.model('Order', orderSchema)
exports.Order = Order 