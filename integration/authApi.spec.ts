import request from "supertest";

import { app } from "../src/";

describe("Auth API", () => {
  describe("POST /auth/signUp", () => {
    it("should return 400 if email is missing", async () => {
      const response = await request(app).post("/auth/signUp").send({
        password: "password",
        name: "name",
      });

      expect(response.status).toBe(400);
    });

    it("should return 400 if password is missing", async () => {
      const response = await request(app).post("/auth/signUp").send({
        email: "email",
        name: "name",
      });

      expect(response.status).toBe(400);
    });

    it("should return 400 if name is missing", async () => {
      const response = await request(app).post("/auth/signUp").send({
        email: "email",
        password: "password",
      });

      expect(response.status).toBe(400);
    });

    it("should return 200 if user is created", async () => {
      const randomString = Math.random().toString(36).substring(7);

      const response = await request(app).post("/auth/signUp").send({
        email: randomString,
        password: "password",
        name: "name",
      });

      expect(response.status).toBe(200);
    });
  });

  describe("POST /auth/login", () => {
    it("should return 400 if email is missing", async () => {
      const response = await request(app).post("/auth/login").send({
        password: "password",
      });

      expect(response.status).toBe(400);
    });

    it("should return 400 if password is missing", async () => {
      const response = await request(app).post("/auth/login").send({
        email: "email",
      });

      expect(response.status).toBe(400);
    });

    it("should return 404 if user is not found", async () => {
      const response = await request(app).post("/auth/login").send({
        email: "email",
        password: "password",
      });

      expect(response.status).toBe(404);
    });

    it("should return 401 if password is wrong", async () => {
      const randomString = Math.random().toString(36).substring(7);

      await request(app).post("/auth/signUp").send({
        email: randomString,
        password: "password",
        name: "name",
      });

      const response = await request(app).post("/auth/login").send({
        email: randomString,
        password: "wrongPassword",
      });

      expect(response.status).toBe(401);
    });

    it("should return 200 if user is logged in", async () => {
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

      expect(response.status).toBe(200);
    });
  });
});
