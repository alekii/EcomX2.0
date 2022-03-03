const request = require("supertest");
const { User } = require("../../model/users");
let  server;
describe("Auth Middleware", () => {
    let token;
  const exec = () => {
    return request(server)
      .post("/api/products")
      .set("x-auth-token", token)
      .send({ name: "prod1" });
  };
    
  beforeEach(async()=>{
    server = require('../../app')
    token = new User().generateAuthToken()
  })
  afterEach(async()=>{
    await server.close()
})

  it("should return 401 if no token is provided", async() => {
    token =''
    const res = await exec();
   expect(res.status).toBe(401)
  });
  it("should return 400 if token is invalid", async() => {
    token ='a'
    const res = await exec();
   expect(res.status).toBe(400)
  });
});
