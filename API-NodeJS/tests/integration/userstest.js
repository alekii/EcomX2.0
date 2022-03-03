const request = require("supertest");
const { User } = require("../../model/users");
let server;

describe("User Test", () => {
  beforeEach(() => {
    server = require("../../app");
  });

  afterEach(async () => {
    await server.close();
    await User.remove();
  });

  describe("given name and pass", () => {
    it("should return a valid user", async () => {
      const result = await request(server).post("/api/users").send({
        name: "alexm",
        email: "email23@gmail.com",
        password: "12345678",
      });
      expect(result.status).toBe(200);
    });
  });
});
