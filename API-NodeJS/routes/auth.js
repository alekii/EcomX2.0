const {User} = require('../model/users');
const _=require ('lodash')
const Joi = require('joi');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/',async(req,res)=>{ 
   //const {error} = validate(req.body);
   //if(error) return res.status(400).send(error.details[0].message);

   //check if user already registered

let user = await User.findOne({ email:req.body.email});
   if(!user) return res.status(400).send('Invalid username or password')
   const validPass = await bcrypt.compare(req.body.password, user.password)
   if(!validPass) return res.status(400).send('Invalid email or password')
   
   const token = user.generateAuthToken();  
   res.header("x-auth-token", token).send(_.pick(user,['firstName','lastName']));   
})

 
function validate(req){
   const schema = { 
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
  };
   return Joi.validate(User, schema)
}

module.exports = router;