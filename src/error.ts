export interface AppErrorOptions {
  code: string;
  status?: number;
  message?: string;
}

export class AppError extends Error {
  code: string;
  status: number;

  constructor({ code, status = 400, message }: AppErrorOptions) {
    super(message ?? code);
    this.code = code;
    this.status = status;
  }
}

export const ErrorMap: Record<
  string,
  { status: number; message: string }
> = {
  VALIDATION_ERROR: {
    status: 400,
    message: "Validation failed"
  },
  NOT_FOUND: {
    status: 404,
    message: "Resource not found"
  },
  UNAUTHORIZED: {
    status: 401,
    message: "Unauthorized"
  }
};
