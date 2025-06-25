import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { ErrorHandler } from "../utilities/errorHandler.utility";
import { asyncHandler } from "../utilities/asyncHandler.utility";

export const isAuthenticated = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ErrorHandler(401, "Unauthorized - No token provided"));
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded !== "object" || !("userId" in decoded)) {
      return next(new ErrorHandler(401, "Invalid token payload"));
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return next(new ErrorHandler(401, "User not found"));
    }

    req.user = user;
    next();
  }
);
