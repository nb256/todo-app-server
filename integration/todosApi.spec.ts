import { Todo } from "@prisma/client";
import request from "supertest";

import { app } from "../src";

describe("Todos API", () => {
  let createdTodo: Todo;

  it("should create a todo", async () => {
    const response = await request(app).post("/todos/create").send({
      title: "My first todo",
    });

    createdTodo = response.body;

    expect(response.status).toBe(200);
  });

  it("should not create a todo without a title", async () => {
    const response = await request(app).post("/todos/create").send({});

    expect(response.status).toBe(400);
  });

  it("should mark a todo as completed", async () => {
    const response = await request(app).post("/todos/markTodoCompleted").send({
      id: createdTodo.id,
    });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("COMPLETED");
  });

  it("should mark a todo as uncompleted", async () => {
    const response = await request(app)
      .post("/todos/markTodoUncompleted")
      .send({
        id: createdTodo.id,
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("UNCOMPLETED");
  });

  it("should delete a todo", async () => {
    const response = await request(app).post("/todos/delete").send({
      id: createdTodo.id,
    });

    expect(response.status).toBe(200);
  });
});
