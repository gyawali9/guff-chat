import { Schema, Types, model } from "mongoose";

const conversationSchema = new Schema(
  {
    participants: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

export default model("Conversation", conversationSchema);
