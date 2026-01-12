import express from "express";
import request from "supertest";
import { responseKit } from "../middleware";

describe("res.fail", () => {
  it("should return standardized fail response", async () => {
    const app = express();
    app.use(responseKit());

    app.get("/test", (req, res) => {
      res.fail("NOT_FOUND", 404);
    });

    const res = await request(app).get("/test");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      success: false,
      code: "NOT_FOUND",
      message: "NOT_FOUND"
    });
  });
});
