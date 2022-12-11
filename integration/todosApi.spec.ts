import request from "supertest";

import { app } from "../src";

describe("Todos API", () => {
  it("should create a todo", async () => {
    const response = await request(app).post("/todos/create").send({
      title: "My first todo",
    });

    expect(response.status).toBe(200);
  });

  it("should not create a todo without a title", async () => {
    const response = await request(app).post("/todos/create").send({});

    expect(response.status).toBe(400);
  });
});
