import { Schema, Types, model } from "mongoose";

interface Message {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const messageSchema = new Schema<Message>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = model<Message>("Message", messageSchema);
export default Message;
