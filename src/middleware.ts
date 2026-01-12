import { Response, NextFunction, Request } from "express";

export function responseKit() {
  return function (_req: Request, res: Response, next: NextFunction) {
    res.success = function <T>(data: T) {
      return res.json({
        success: true,
        data
      });
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

    next();
  };
}
