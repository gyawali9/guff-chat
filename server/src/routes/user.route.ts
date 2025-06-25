import express from "express";
import {
  getOtherUsers,
  getProfile,
  login,
  logout,
  register,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", isAuthenticated, logout);
userRouter.get("/get-profile", isAuthenticated, getProfile);
userRouter.get("/get-other-users", isAuthenticated, getOtherUsers);

export default userRouter;
