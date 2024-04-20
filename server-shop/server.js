import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import Express from "express";
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from "mongoose";
import multer from "multer";
import { Server } from 'socket.io';
import router_upload from "./router/upload_router.js";
import router_elastic from './elastic_search/elastic_search.js';
import './google/google-auth.js';
import router_category from "./router/category_router.js";
import router_chat from './router/chat_router.js';
import router_order from "./router/order_router.js";
import router_product from "./router/product_router.js";
import router_auth from "./router/user_router.js";
import { router as order_router } from './vnpay/vnpay.js';
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
    origin: function (origin, callback) {
        console.log(origin);
        if (!origin) return callback(null, true)
        if (
            origin.includes(process.env.WHITE_URL_1) ||
            origin.includes(process.env.WHITE_URL_2)
        ) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
    preflightContinue: true
}));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set('views', __dirname + '\\views')
app.use(Express.static(join(__dirname, 'public')));

app.set('view engine', 'jade')
app.get('/', (req, res) => {
    res.render('index.pug')
})
app.use(cookieParser());
app.use(mongoSanitize({ allowDots: true }))
app.use(upload.array('images', 100))

app.use("/api/", order_router)
app.use("/api/", router_auth);
app.use("/api/", router_order);
app.use("/api/", router_product);
app.use("/api/", router_category);
app.use("/api/", router_elastic)
app.use("/api/", router_upload)
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
