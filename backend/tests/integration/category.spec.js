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
  it("CREATE CATEGORY", async () => {
    const response = await request(app)
      .post("/list_categories")
      .send({
        categoria: "categoria 3",
      })
      .auth("authorization", "12341");
    expect(response.body).toHaveProperty("id");
  });
});
