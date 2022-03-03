const mongoose = require('mongoose');
const {Product} =  require('../model/product')
const {Category} =  require('../model/category')
const express = require('express');
const Joi = require('joi');
const { rearg } = require('lodash');
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const router = express.Router()

router.post('/',async(req,res)=>{

const {error} = validate(req.body)

if(error) return res.status(400).send('Check category name length')
 const category = new Category(req.body)

const result = await category.save()

if(!result) return res.status(400).send('Something went wrong')
 res.status(200).send(result)
 
})

function validate(category){
   
    const schema = {
    
        name: Joi.string().max(50).required()
   
    }
   
    return Joi.validate(category,schema)
}

router.put("/",async(req,res)=>{
    console.log(req.body)
  //  const {error} = validate(req.body)
   
  //  if(error) return res.status(400).send('Check Category name length')
   
    let category = await Category.find({name:req.body.oldname}) 
    category[0].name = req.body.newname 
    let result = await category[0].save()  
    if(!result) return res.status(400).send("Bad Request")

    res.status(200).send(result)
})

router.get('/',async(req,res)=>{
     const categories = await Category
           .find()
    res.status(200).send(categories)

}) 

router.get('/:category',async(req,res)=>{
    let param = (req.params.category).toString() 
    if(!param) res.status(400).send("Error")

    
    const category = await Category
    .find({name:param}) 
      
    if(!category) res.status(404).send("Category not Found")

     const products = await Product
    .find({category:category[0]._id }) 
    .where('quantityInStock').gte(1)
    .limit(6)
  

    
    if(!products) res.status(401),send('Products could not be fetched')
    res.status(200).send(products)
})

module.exports = router