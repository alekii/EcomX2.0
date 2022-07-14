require('dotenv').config();
const Joi = require('joi');
const products = require('./routes/products')
const users = require('./routes/users')
const orders = require('./routes/orders')
const categoryx = require('./routes/category')
const auth = require('./routes/auth')
const express = require('express');
const { Mongoose } = require('mongoose'); 
const app = express()
const api = process.env.API_URL;
 
require('./startup/db')()
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-auth-token, x-refresh-token'
    );next();
  });
  
app.use(express.json());

//routes
app.use(`${api}/api/products`, products);
app.use(`${api}/api/users`, users)
app.use(`${api}/api/orders`, orders)
app.use(`${api}/api/category`, categoryx);
app.use(`${api}/api/auth`, auth)


const port = process.env.PORT || 3000

const server = app.listen(port, ()=> console.log(`Listening on port ${port}...`));

module.exports = server 
