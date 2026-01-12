import express from "express";
import request from "supertest";
import { responseKit } from "../middleware";

describe("res.success", () => {
  it("should return standardized success response", async () => {
    const app = express();
    app.use(responseKit());

    app.get("/test", (req, res) => {
      res.success({ hello: "world" });
    });

    const res = await request(app).get("/test");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      data: { hello: "world" }
    });
  });
});
