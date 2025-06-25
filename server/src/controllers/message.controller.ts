import { Request, Response, NextFunction } from "express";
import Message from "../models/message.model";
import Conversation from "../models/conversation.model";
import { asyncHandler } from "../utilities/asyncHandler.utility";
import { ErrorHandler } from "../utilities/errorHandler.utility";
// import { getSocketId, io } from "../socket/socket";

// Extend Express Request to include `user`
// interface AuthenticatedRequest extends Request {
//   user: {
//     _id: string;
//   };
// }

// Send a message
export const sendMessage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const senderId = req.user?._id;
    const receiverId = req.params.receiverId;
    const messageText = req.body.message;

    if (!senderId || !receiverId || !messageText) {
      return next(new ErrorHandler(400, "All fields are required"));
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message: messageText,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    // Emit socket message
    // const socketId = getSocketId(receiverId);
    // if (socketId) {
    //   io.to(socketId).emit("newMessage", newMessage);
    // }

    res.status(200).json({
      success: true,
      data: newMessage,
      message: "Message sent successfully",
    });
  }
);

// Get messages from a conversation
export const getMessages = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const myId = req.user?._id;
    const otherParticipantId = req.params.otherParticipantId;

    if (!myId || !otherParticipantId) {
      return next(new ErrorHandler(400, "All fields are required"));
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [myId, otherParticipantId] },
    }).populate("messages");

    res.status(200).json({
      success: true,
      data: conversation,
      message: "Messages fetched successfully",
    });
  }
);
