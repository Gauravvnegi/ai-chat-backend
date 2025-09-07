import express from "express";
import UserLoginsDetails from "../models/UserLoginsDetails.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { fname, lname, userNumber, password, email } = req.body;

    if (!fname || !lname || !userNumber || !password || !email) {
      return res
        .status(400)
        .json({ message: "Please provide all the required details" });
    }

    const userExists = await UserLoginsDetails.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await UserLoginsDetails.create({
      fname,
      lname,
      userNumber,
      password,
      email,
    });

    res.status(201).json({
      id: newUser.userId,
      fname: newUser.fname,
      lname: newUser.lname,
      email: newUser.email,
      userNumber: newUser.userNumber,
      message: "User registered successfully",
    });

    console.log("User created:", newUser.email);
  } catch (err) {
    console.error(`Failed to create User: ${err}`);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserLoginsDetails.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      userId: user.userId,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
    });
    console.log("User logged in:", user.email);
  } catch (err) {
    console.error(`Login error: ${err}`);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
