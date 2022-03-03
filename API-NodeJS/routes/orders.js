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
  console.log(params)
   const orderInfo = await Order.findById(params) 
   items =[]
   let categories =[]
   if(!orderInfo) return res.status(400).send("Order not found") 
   for(let order of orderInfo.orderItems){ 
            const product = await Product.findById(order._id)   
            if(!product) return res.status(400).send("Product could not be retrieved")
            const category = await Category.findById(product.category)
            if(!category) return res.status(400).send("category could not be retrieved")
              product.quantityInStock = order.quantity 
              items.push(product) 
              categories.push(category.name)
   }
   orderDetails.push(items) 
   orderDetails.push(orderInfo.shipmentInfo)  
   orderDetails.push(categories)
   res.status(200).send(orderDetails)
 })
 
 

module.exports = router