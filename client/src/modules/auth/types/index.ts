import type { z } from "zod";
import type { getSignupSchema, signInSchema } from "../schemas";
import type { Gender } from "@/constants/enum";

type SignUpType = z.infer<ReturnType<typeof getSignupSchema>>;
type SignInType = z.infer<typeof signInSchema>;

interface IUser {
  _id: string;
  fullName: string;
  userName: string;
  gender: Gender;
  profilePic?: string;
  bio?: string;
}

export type { SignUpType, SignInType, IUser };
