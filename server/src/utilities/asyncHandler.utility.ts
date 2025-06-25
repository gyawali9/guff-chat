import { Request, Response, NextFunction, RequestHandler } from "express";
import { ErrorHandler } from "./errorHandler.utility";

type AsyncRequestHandler<
  Req extends Request = Request,
  Res extends Response = Response
> = (req: Req, res: Res, next: NextFunction) => Promise<unknown>;

export const asyncHandler = <
  Req extends Request = Request,
  Res extends Response = Response
>(
  fn: AsyncRequestHandler<Req, Res>
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req as Req, res as Res, next)).catch((error) => {
      if (error instanceof ErrorHandler) {
        return next(error);
      }

      next(
        new ErrorHandler(
          500,
          error?.message || "Internal Server Error",
          [],
          error?.stack
        )
      );
    });
  };
};
