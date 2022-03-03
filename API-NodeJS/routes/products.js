const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Product } = require("../model/product");
const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/",[auth,admin], async(req, res) => {
   const { error } = validateProduct(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  let product = new Product(req.body)
  product = await product.save()
  res.status(200).send()
});

router.get("/:productName", async(req, res) => {  
  let param = (req.params.productName).replace(/\-/," ").replace(".html",""); 
  const product = await Product.findOne({ title: param  }, function(err,doc){ 
  })
 if (!product) return res.status(400).send("Product with ID given is non existent");
if(product.quantityInStock===0) return res.status(400).send('Product not in Stock')
res.status(200).send(product)
});

router.get('/outofstock/never',[auth,admin], async(req,res)=>{
  let products = await Product.find()
              .where('quantityInStock').lte(0)
              .limit(6)
  if(!products) return res.status(400).send("No product is out of stock")
  res.status(200).send(products)
})
router.put("/",[auth,admin],async(req,res)=>{
   const { error } = validateProduct(req.body); 
   if (error) return res.status(400).send(error.details[0].message);
   let product = await Product.findByIdAndUpdate(req.id, {
    $set:(req.body)
}) 
    res.status(200).send()
})

router.put("/addstock", [auth,admin], async (req, res)=>{ 
          let product = await Product.findByIdAndUpdate(req.body.productToUpdate,{
               $set:{
                 quantityInStock: req.body.quantityInStock 
               }
          }) 
          if(!product) return  res.status(400).send("Stock could not be updated at this time")
          res.status(200).send ()
})



router.delete("/",[auth,admin], async(req,res)=>{
    const result = await Product.findByIdAndRemove(req.id)
    if(!result) return res.status(400).send()
    res.status(200).send()
})


 
function validateProduct(product) {
  const schema = {
    title: Joi.string().min(1).required(),
    price: Joi.number().integer().required(),
    quantityInStock: Joi.number().integer().required(),
    quantityInStock: Joi.number().integer().required(),
    imagePath: Joi.string().required(),
    category:Joi.string().required()
  };
  return Joi.validate(product, schema);
}

module.exports = router;
