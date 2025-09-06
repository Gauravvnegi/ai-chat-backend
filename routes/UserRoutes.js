import express from "express";
import UserSignup from "../models/UserSignup.js";

const router = express.Router();


router.post("/signup", async (req, res) => {
  try {
    const { fname, lname, userNumber, password, email } = req.body;

  
    if (!fname || !lname || !userNumber || !password || !email) {
      return res
        .status(400)
        .json({ message: "Please provide all the required details" });
    }

    const userExists = await UserSignup.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

   
    const newUser = await UserSignup.create({
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



router.get("/login", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

export default router;
