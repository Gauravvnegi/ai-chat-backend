import express from "express";
import OneToOneChatMessage from "../models/MessageSchema.js";

const router = express.Router();


router.post("/send", async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const newMessage = new OneToOneChatMessage({ senderId, receiverId, message });
    await newMessage.save();
    console.log("Message saved:", newMessage);
    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/:user1/:user2", async (req, res) => {
  try {
    const { user1, user2 } = req.params;
    const messages = await OneToOneChatMessage.find({
      $or: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 },
      ],
    }).sort({ createdAt: 1 });
    console.log(`Fetched messages between ${user1} and ${user2}:`, messages);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
