import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const OneToOneChatMessage = mongoose.model("OneToOneChatMessage", messageSchema);

export default OneToOneChatMessage;
