import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../utilities/errorHandler.utility";

export const errorMiddleware = (
  err: Error | ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = (err instanceof ErrorHandler && err.statusCode) || 500;

  const responseBody = {
    success: false,
    message: err.message || "Internal Server Error",
    errors: err instanceof ErrorHandler ? err.errors : [],
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  };

  res.status(statusCode).json(responseBody);
};
