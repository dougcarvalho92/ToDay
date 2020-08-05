const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");
describe("TASK", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });
  afterAll(async () => {
    await connection.destroy();
  });
  it("CREATE USERS", async () => {
    const response = await request(app).post("/register").send({
      nome: "usuario teste",
      senha: "12345",
      email: "teste@gmail.com",
    });
    expect(response.body).toHaveProperty("id");
  });
});
