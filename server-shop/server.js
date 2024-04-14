import Express from "express";
import router_auth from "./router/user_router.js";
import router_product from "./router/product_router.js";
import { router as router_upload_image } from "./cloudinary/upload_image.js";
import router_category from "./router/category_router.js";
import router_order from "./router/order_router.js";
import router_elastic from './elastic_search/elastic_search.js'
import { router as router_mailer } from './nodemailer/nodemailer_config.js'
import { router as order_router } from './vnpay/vnpay.js'
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import http from 'http';
import { Server } from 'socket.io'
import './google/google-auth.js'
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from 'express-mongo-sanitize';
import multer from "multer";
import router_chat from './router/chat_router.js'
import cookieSession from "cookie-session";
import passport from "passport";
var upload = multer()
const app = Express();
dotenv.config();
const serverSocket = http.createServer(app)
const socketIO = new Server(serverSocket, {
    cors: {
        origin: [process.env.WHITE_URL_1, process.env.WHITE_URL_2],
        credentials: true,

    }
});

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["die"]
}));
app.use(rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    keyGenerator: (req, res) => {
        return req.clientIp
    }
}));
app.use(helmet())
app.use(Express.json({ limit: '10MB' }));
app.use(Express.urlencoded({ extended: true, limit: "500MB" }));
app.use(cors({
    credentials: true,
    origin: [process.env.WHITE_URL_1, process.env.WHITE_URL_2],
    preflightContinue: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(cookieParser());
app.use(mongoSanitize({ allowDots: true }))
app.use(upload.array('images', 100))
app.use("/api/", order_router)
app.use("/api/", router_auth);
app.use("/api/", router_order);
app.use("/api/", router_product);
app.use("/api/", router_category);
app.use("/api/", router_elastic)
app.use("/api/", router_mailer)
app.use("/api/", router_upload_image)
app.use("/api/", router_chat)

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
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", (userData) => {
        console.log("USER DISCONNECTED");
        socket.leave(userData);
    });
});
