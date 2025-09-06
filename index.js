import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/UserRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use("/api/users", userRoutes);

app.use('/' , (req,res)=>{
    res.send("Welcome to the AI");
    // res.status(200).send("Welcome to the AI");
    console.log("Welcome Gaurav");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
