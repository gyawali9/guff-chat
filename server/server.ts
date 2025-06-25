import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/db";
import userRouter from "./src/routes/user.route";
import { errorMiddleware } from "./src/middlewares/error.middleware";
import messageRouter from "./src/routes/message.route";

dotenv.config();

// create express app and http server (socket.io support )
const app = express();

// middleware setup
app.use(cors());

app.use(
  express.json({
    limit: "4mb",
  })
);
app.use(cookieParser()); // parse cookies

// routes setup

// ✅ Error handling middleware (always at end)

app.get("/", (req: Request, res: Response) => {
  res.send("Server is live");
});

const port = process.env.PORT || 5001;

// routes
// import userRoute from "./routes/user.route.js";
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/message", messageRouter);

// error handling middle at end
app.use(errorMiddleware);

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log("Server running on Port:" + port);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

export default app;
