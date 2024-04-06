import Express from "express";
import router_auth from "./router/user_router.js";
import router_product from "./router/product_router.js";
import { router as router_upload_image } from "./cloudinary/upload_image.js";
import router_category from "./router/category_router.js";
import router_order from "./router/order_router.js";
import router_elastic from './elastic_search/elastic_search.js'
import { router as router_mailer } from './nodemailer/nodemailer_config.js'
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import http from 'http';
import { Server } from 'socket.io'
import './google/google-auth.js'
import helmet from "helmet";
import mongoSanitize from 'express-mongo-sanitize';
const app = Express();
dotenv.config();
const serverSocket = http.createServer(app)
const socketIO = new Server(serverSocket);

app.use(helmet())
app.use(Express.json({ limit: '10MB' }));
app.use(Express.urlencoded({ extended: true, limit: "60mb" }));
app.use(cors({ credentials: true, origin: [process.env.WHITE_URL_1, process.env.WHITE_URL_2] }));
app.use(cookieParser());
app.use(mongoSanitize({ allowDots: true }))

app.use("/api/", router_auth);
app.use("/api/", router_order);
app.use("/api/", router_product);
app.use("/api/", router_category);
app.use("/api/", router_elastic)
app.use("/api/", router_mailer)
app.use("/api/", router_upload_image)
mongoose.connect(process.env.URL_DB)
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err.message);
    });

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected`);
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
});