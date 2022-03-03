const request = require("supertest");
const { Product } = require("../../model/product");
let server;

describe("User Test", () => {
  beforeEach(() => {
    server = require("../../app");
  });

  afterEach(async () => {
    await server.close(); 
  });

  describe("given details", () => {
    // it("should return a valid product", async () => {
    //   const result = await request(server).post("/api/products").send({
    //     title: "banana",
    //     price: 1,
    //     quantity: 1,
    //     category:'a'
    //   });
    //   expect(result.status).toBe(200);
    // });

    // it("should update product", async () => {
    //   const result = await request(server).put("/api/products").send({
    //     title: "banana",
    //     price: 3,
    //     quantity: 1,
    //     category:'a'
    //   });
    //   expect(result.status).toBe(200);
    // });
      
       it('should delete product',async()=>{
         const result = await (await request(server).delete("/api/products")).setEncoding({
           id:"someID"
         })
       expect(result.status).toBe(200)
       })
  });
});
