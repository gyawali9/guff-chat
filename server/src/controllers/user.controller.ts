import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utilities/asyncHandler.utility";
import { ErrorHandler } from "../utilities/errorHandler.utility";
import User from "../models/user.model";

const createTokens = (userId: string) => {
  try {
    if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
      throw new ErrorHandler(500, "JWT secrets are not defined in environment");
    }

    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    if (!accessToken || !refreshToken) {
      throw new ErrorHandler(500, "Failed to generate authentication tokens");
    }

    return { accessToken, refreshToken };
  } catch (err: any) {
    throw new ErrorHandler(
      500,
      "Token generation failed",
      [],
      err.stack || err.message
    );
  }
};

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { fullName, userName, password, gender, bio } = req.body;

    // Validate required fields
    if (!fullName || !userName || !password || !gender || !bio) {
      return next(new ErrorHandler(400, "All fields are required"));
    }

    // Check for existing user
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return next(new ErrorHandler(400, "User already exists"));
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = await User.create({
      userName,
      fullName,
      password: hashedPassword,
      gender,
      bio,
    });

    // generate token
    const { accessToken, refreshToken } = createTokens(newUser._id.toString());

    // Get user without password
    const userToSend = await User.findById(newUser._id).select("-password");

    // Set HTTP-only refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      data: {
        user: userToSend,
        token: accessToken,
      },
      message: "Account Created Successfully",
    });
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    // check if user has registered
    if (!username || !password) {
      return next(
        new ErrorHandler(400, "Please enter a valid username or password")
      );
    }

    const user = await User.findOne({ username });
    if (!user) {
      return next(
        new ErrorHandler(400, "Please enter a valid username or password")
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return next(
        new ErrorHandler(400, "Please enter a valid username or password")
      );
    }

    const { accessToken, refreshToken } = createTokens(user._id.toString());

    const userData = await User.findById(user._id).select("-password");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      data: {
        user: userData,
        token: accessToken,
      },
      message: "Login Successful",
    });
  }
);

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const profile = await User.findById(userId);

  res.status(200).json({
    success: true,
    data: {
      user: profile,
    },
    message: "Profile detail fetched successfully",
  });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logout successful!",
      data: [],
    });
});

export const getOtherUsers = asyncHandler(
  async (req: Request, res: Response) => {
    const currentUserId = (req as any).user._id; // Again, type properly for production

    const otherUsers = await User.find({ _id: { $ne: currentUserId } });

    res.status(200).json({
      success: true,
      data: {
        user: otherUsers,
      },
      message: "Details fetched successfully",
    });
  }
);
