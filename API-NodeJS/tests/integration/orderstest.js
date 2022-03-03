const request = require('supertest')
const {Order} = require('../../model/order');
const { User } = require('../../model/users');
let server;

describe('Orders Tests',()=>{

beforeEach(()=>{
     server = require('../../app')
})

afterEach(async()=>{
    await server.close()
    //await Order.remove()
})

describe('Add order',()=>{
    it('should add order',async ()=>{
        const result = await request(server).post("/api/orders").send({
            userID:"a",
            orderID:"1",
            orderComplete:false,
            orderItems:[
                {product:"2",
                quantity:3},
                {product:"4",
                quantity:5}
            ],
            orderAmount:9, 
        })
        expect(result.status).toBe(200)
    })
    
})

})