import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import cors from "cors";
import http from "http"; 

import connectDB from "./config/db.js";
import userRoutes from "./routes/UserRoutes.js";
import messageRoutes from "./routes/messages.js";

dotenv.config();

const app = express();


const server = http.createServer(app);
// Setup socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*", 
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || "*" 
}));

// DB Connection
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the AI Chat Server");
  console.log("Welcome Gaurav");
});

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(`Socket ID: ${socket.id}`);
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});