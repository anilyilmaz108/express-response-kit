import { Request, Response, NextFunction } from "express";
import { AppError, ErrorMap } from "./error";

export function responseKit() {
  return function (_req: Request, res: Response, next: NextFunction) {
    res.success = function <T>(data: T) {
      return res.json({ success: true, data });
    };

    res.fail = function (
      code: string,
      status = 400,
      message?: string
    ) {
      return res.status(status).json({
        success: false,
        code,
        message: message ?? code
      });
    };

    res.failFromError = function (error: unknown) {
      // Known AppError
      if (error instanceof AppError) {
        return res.fail(error.code, error.status, error.message);
      }

      // ErrorMap lookup
      if (
        typeof error === "string" &&
        ErrorMap[error]
      ) {
        const mapped = ErrorMap[error];
        return res.fail(error, mapped.status, mapped.message);
      }

      // Unknown error
      return res.fail(
        "INTERNAL_SERVER_ERROR",
        500,
        "Unexpected error occurred"
      );
    };

    next();
  };
}
