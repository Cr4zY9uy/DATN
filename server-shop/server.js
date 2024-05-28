import dotenv from "dotenv";
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from "mongoose";
import { Server } from 'socket.io';
import app from "./app.js";
import Express from "express";
dotenv.config();
const serverSocket = http.createServer(app)

const socketIO = new Server(serverSocket, {
    cors: {
        origin: [process.env.WHITE_URL_1, process.env.WHITE_URL_2],
        credentials: true
    }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('views', __dirname + '\\views')
app.use(Express.static(join(__dirname, 'public')));

app.set('view engine', 'jade')
app.get('/', (req, res) => {
    res.render('index.pug')
})

mongoose.connect(process.env.URL_DB)
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err.message);
    });

serverSocket.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});




socketIO.on('connection', (socket) => {

    console.log(`⚡: ${socket.id} user just connected`);
    socket.on("setup", (userData) => {
        socket.join(userData);
        console.log('id ', userData);
        socket.emit("connected");
    });


    socket.on("join chat", (room) => socket.join(room)
    );

    socket.on("send message", (data) => {
        const { senderId, receiverId, content } = data;
        socket.to(receiverId).emit("receive message", { senderId, content });
    });

    socket.on("new message", (newMessageRecieved) => {
        if (!newMessageRecieved.roomId) return console.log("Not defined");
        newMessageRecieved.message.forEach((user) => {
            console.log(user.userId._id);
            socket.in(user.userId._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", (userData) => {
        console.log("USER DISCONNECTED");
        socket.leave(userData);
    });
});

