import { Todo } from "@prisma/client";
import request from "supertest";

import { app } from "../src";

describe("Todos API", () => {
  let createdTodo: Todo;
  let accessToken: string;

  beforeAll(async () => {
    const randomString = Math.random().toString(36).substring(7);

    await request(app).post("/auth/signUp").send({
      email: randomString,
      password: "password",
      name: "name",
    });

    const response = await request(app).post("/auth/login").send({
      email: randomString,
      password: "password",
    });

    accessToken = response.body.jwtToken;
  });

  it("should create a todo", async () => {
    const response = await request(app)
      .post("/todos/create")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title: "My first todo",
      });

    createdTodo = response.body;

    expect(response.status).toBe(200);
  });

  it("should not create a todo without a title", async () => {
    const response = await request(app)
      .post("/todos/create")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({});

    expect(response.status).toBe(400);
  });

  it("should mark a todo as completed", async () => {
    const response = await request(app)
      .post("/todos/markTodoCompleted")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        id: createdTodo.id,
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("COMPLETED");
  });

  it("should mark a todo as uncompleted", async () => {
    const response = await request(app)
      .post("/todos/markTodoUncompleted")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        id: createdTodo.id,
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("UNCOMPLETED");
  });

  it("should delete a todo", async () => {
    const response = await request(app)
      .post("/todos/delete")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        id: createdTodo.id,
      });

    expect(response.status).toBe(200);
  });

  it("should get all todos", async () => {
    const response = await request(app)
      .get("/todos")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
  });
});
