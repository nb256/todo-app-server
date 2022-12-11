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
      const response = await request(app).post("/auth/signUp").send({
        email: "email",
        password: "password",
        name: "name",
      });

      expect(response.status).toBe(200);
    });
  });
});
