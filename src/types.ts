import "express";

export interface SuccessResponse<T = unknown> {
  success: true;
  data: T;
}

export interface FailResponse {
  success: false;
  code: string;
  message: string;
}

declare module "express-serve-static-core" {
  interface Response {
    success<T>(data: T): this;
    fail(code: string, status?: number, message?: string): this;
    failFromError(error: unknown): this;
  }
}
