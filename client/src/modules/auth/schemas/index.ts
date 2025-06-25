import { z } from "zod";

export const getSignupSchema = (signUpStep: 1 | 2) =>
  z
    .object({
      fullName: z.string().min(1, { message: "Name is required" }),
      userName: z.string().min(1, { message: "Username is required" }),
      password: z.string().min(1, { message: "Password is required" }),
      confirmPassword: z.string().min(1, { message: "Password is required" }),
      gender: z.enum(["M", "F"], { message: "Gender is required" }),
      bio:
        signUpStep === 2
          ? z.string().min(1, { message: "Bio is required" })
          : z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password doesn't match",
      path: ["confirmPassword"],
    });
