interface ErrorHandlerDetail {
  field?: string;
  message: string;
}

class ErrorHandler extends Error {
  statusCode: number;
  data: null;
  success: false;
  errors: ErrorHandlerDetail[];

  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors: ErrorHandlerDetail[] = [],
    stack = ""
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ErrorHandler, type ErrorHandlerDetail };
