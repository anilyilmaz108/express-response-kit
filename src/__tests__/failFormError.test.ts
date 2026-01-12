import express from "express";
import request from "supertest";
import { responseKit, AppError } from "../index";

describe("res.failFromError", () => {
  it("handles AppError correctly", async () => {
    const app = express();
    app.use(responseKit());

    app.get("/test", (_req, _res) => {
      throw new AppError({
        code: "NOT_FOUND",
        status: 404
      });
    });

    app.use((err: any, _req: any, res: any, _next: any) => {
      res.failFromError(err);
    });

    const res = await request(app).get("/test");

    expect(res.status).toBe(404);
    expect(res.body.code).toBe("NOT_FOUND");
  });
});
