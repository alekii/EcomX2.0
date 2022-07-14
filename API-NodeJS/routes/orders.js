const {Order} = require("../model/order")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const {Product} = require("../model/product")
const mongoose = require('mongoose')
const express = require("express")  
const { Category } = require("../model/category")
const router = express.Router()
 
router.post("/",[auth],async(req, res)=>{  
   let orderAmount = 0; 
  const orderItems = req.body.orderItems
  for (let order of  orderItems) {
  let product = await Product.findById(order._id);
  let quantity = order.quantity;
  product.quantityInStock -= quantity;
  await product.save();
  orderAmount += order.quantity * product.price;
 }
const user = req.user._id
const shipmentInfo = req.body.shipmentInfo 
const createdAt = new Date().setHours(0,0,0,0)
const order = new Order({ 
  user,  
  orderItems,
  shipmentInfo,
  orderAmount,
  createdAt
});
 const result = await order.save();
  if(!result) return res.status(400).send("Bad Request")
    res.status(200).send(result)
})

router.get("/", async(req,re)=>{
  const orders = await Order
         .find()
         .populate("user","name -_id", User)
         .select("orderID orderComplet user orderItems orderAmount")

if(!orders) return res.staus(400).send("Something went wrong");
res.status.send(orders)
})

router.get("/today",[auth,admin],async(req,res)=>{ 
 const date =  new Date().setHours(0,0,0,0) 
  const orders = await Order.find({createdAt:date}) 
                    
                    .limit(6)
                    .select("orderID orderAmount")


        if(!orders) return res.status(400).send("Could not find orders")
        res.status(200).send(orders)
})

router.get("/:orderID",async(req,res)=>{  
   let orderDetails = []
   let params = (req.params.orderID)  
 
   Order.findById(params)
   .then(async (order) => {
     if(order) {
       await order.orderItems.map(async (orderItem) =>{
           await Product.findById(order._id)
            .then(async (product) =>{
              if(product) {
                await Category.findById(product.category)
                 .then(async (category)=>{
                  if(category){
                    product.quantityInStock = order.quantity;
                    items.push(product) 
                    categories.push(category.name);
                  } else {
                    return res
                           .status(404)
                           .send('category could not be retrieved"')
                  }
                 })
              } else {
                return res
                       .status(404)
                       .send('product could not be retrieved"')
              }
            })     
       }) 
       orderDetails.push(items) 
       orderDetails.push(order.shipmentInfo)  
       orderDetails.push(categories)
       return res
              .status(200) 
              .send(orderDetails) 
     }
   })
   .catch((error) => {
    return res.status(404).send("Order not found") 
   })
  
 })

module.exports = router