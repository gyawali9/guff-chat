import { Schema, Types, model } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  fullName: string;
  userName: string;
  password: string;
  gender: string;
  profilePic: string;
  bio: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true, minlength: 6, select: false },
    gender: {
      type: String,
      required: true,
    },
    profilePic: { type: String, default: "" },
    bio: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);
export default User;
