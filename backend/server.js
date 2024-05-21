// I have created/initialized npm init in root folder so that I can run/access both backend & frontend.
import path from "path";

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();   //without using this i cannot access environment variables from .env file.

const PORT = process.env.PORT || 5000; 

const __dirname = path.resolve();

//Middlewares (Imp Note in Bottom)
app.use(express.json());  //to parse the incoming requests with JSON payloads. (from req.body), used for auth.controller.js file
app.use(cookieParser());

app.use("/api/auth", authRoutes);    //using this i can access all routes starting from /api/auth/(login, logout, etc.)
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")))      //used to serve static files such as html/css, JS, images, sound file etc.
// when we run build on our frontend then all files will save in dist

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// app.get("/", (req,res)=> {
//     res.send("Hii!!")            
// }),

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
})



/**
 If i create multiple routes here like (authentication, login, logout, etc), 
 my file becomes messy so to solve this issue i used middleware to access routes.


Middleware: 
Specify express.json() before your routes like:

(sequence really matters here!)

app.use(express.json());
app.use('/api', Anyroute);

otherwise it shows random error

Time -  1:40:00 min
 */