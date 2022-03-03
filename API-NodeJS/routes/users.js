const auth = require("../middleware/auth");
const admin = require("../middleware/admin")
const config = require("config");
const jwt = require("jsonwebtoken");
const { User, validateUser } = require("../model/users");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

  //check if user already registered
  let user = await User.findOne({ email: req.body.email });
   if (user) return res.status(400).send("User already registered");
   user = new User({ 
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,  
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();
  const token = user.generateAuthToken();
   res.header("x-auth-token", token).send(user);
  res.status(200).send();
});

router.get("/", async(req, res) => {
  const u = await User.find()
  res.send(u);
});

router.get("/current",[auth],async (req, res) => { 
   const user = await User.findById(req.body._id).select("-password");
    res.status(200).send(user);
});
router.get("/admin",[auth,admin],async (req, res) => { 
  const user = await User.findById(req.body._id).select("-password");
   res.status(200).send(user);
});

//validate input
function validate(user) {
  const schema = {
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(), 
    confirmpassword: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(user, schema);
}

module.exports = router;
