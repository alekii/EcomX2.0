require("dotenv").config();

const { User } = require("./model/users");
const { Order,orderSchema } = require("./model/order");
const { Product } = require("./model/product");
const { Category } = require("./model/category");
const {Counters,sequenceDocument } = require('./model/counters')

const mongoose = require("mongoose");
 const app = require("./app");

//add to db

async function createUser(name, email, password) {
  const user = new User({
    name,
    email,
    password,
  });

  const result = await user.save();
  console.log(result);
}

async function createProduct(title, price, quantityInStock, categoryID) {
  const category = await Category.findById(categoryID);
  const product = new Product({
    title,
    price,
    quantityInStock,
    category: {
      _id: category._id,
      name: category.name,
    },
  });
  const result = await product.save();
  console.log(result);
}

async function createCategory(name) {
  const category = new Category({ name });
  const result = await category.save();
  console.log(result);
}

async function createOrder(user, orderComplete, orderItems) {
      
  let orderAmount = 0; 
  for (let order of orderItems) {
    let product = await Product.findById(order.product);
    let quantity = order.quantity;
    product.quantityInStock -= quantity;
    await product.save();
    orderAmount += order.quantity * product.price;
    //   console.log(product)
  }

  const order = new Order({
    user, 
    orderComplete,
    orderItems,
    orderAmount,
  });

  const result = await order.save();
 
}

async function listOrders() {
  const orders = await Order
    //.find()
    .findById("620de2df8c346545e8d4218a")
    .populate("user", "name -_id", User)
    //  .populate('product','title -_id',Product)
    // .populate({path:'user', model:User})
    .select("orderID orderComplete user orderItems orderAmount ");

  //for(let o of orders){
  // const p = await Product.findById(o.product)
  console.log(orders);
  //  }
}

// createCategory("Smartphones")
// createCategory("Smartphone")
// createCategory("Kitchen Appliance")
// createCategory("TVs & Audio")
// createCategory("Women Wear")
// createCategory("Men's Wear")
// createCategory("Watches")

// createProduct( "Infinix Smart",11200,4, "620d59b3a27d7b3850e3ed3a")
//  createProduct( "Blender",3400,5,"620d59b3a27d7b3850e3ed3b")
//   createProduct( "Khaki Trouser",1200,11,"620d59b3a27d7b3850e3ed3c")
//   createProduct( "Infinix Smart",11200,4,"620d59b3a27d7b3850e3ed3d")

//createUser("patrick","pato@gmail.com","123245")
//createUser("Ryano","ryano@gmail.com","123245")
//createUser("Eugene","eugo@gmail.com","123245")

// createOrder("620d3325ee10fc33e4fa5b99",   false, [
//   { product: "620d825935c34e26288e2aff", quantity: 5 },
//   { product: "620d825935c34e26288e2b02", quantity: 7 },
// ]);
// createOrder("620d5fde2c203f25e88a0975",   false, [
//   { product: "620d825935c34e26288e2b02", quantity: 1 },
// ]);
// createOrder("620d5fde2c203f25e88a0975", false, [
//   { product: "620d825935c34e26288e2b05", quantity: 2 },
//   { product: "620d825935c34e26288e2b02", quantity: 2 },
// ]);
// createOrder("620d5fde2c203f25e88a0973",   false, [
//   { product: "620d825935c34e26288e2aff", quantity: 1 },
//   { product: "620d825935c34e26288e2b08", quantity: 2 },
// ]);

//listOrders();

//get Products and update Categories depending on their ProductID
async function getAllProducts(){
 
  const category = await Category
      .find({name:"Smartphone"}) 
 const products = await Product
      .find({category:category[0]._id })
      .limit(2)

  // products.forEach(async(p)=>{
  //   if(p.productID>=31 && p.productID<=36){
  //   let product = await Product.findByIdAndUpdate(p.id,{
  //     $set:{
  //      category:"6214741a13c3f90c900e2dac"
  //     }
  //   })
  //   if(product) {
  //     console.log("succeess")
  //   }
  // }
  // })

  console.log(category[0]._id)
   if(products){
  products.forEach(p=>{ 
    console.log(p)
  })
}
}

async function updateStock(){
  const product = await Product.find()  
  product.forEach(async(p)=>{
    p.quantityInStock = 10
    await p.save()
  })
}

// (async function updateCategoryTvs(){
//   const products = await Product.find()

//   console.log(products)
// })()

updateStock()
//getAllProducts()