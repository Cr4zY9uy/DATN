import Express from "express";
const app = Express();
import router_upload from "./router/upload_router.js";
import router_elastic from './elastic_search/elastic_search.js';
import './google/google-auth.js';
import router_category from "./router/category_router.js";
import router_chat from './router/chat_router.js';
import router_order from "./router/order_router.js";
import router_product from "./router/product_router.js";
import router_auth from "./router/user_router.js";
import { router as order_router } from './vnpay/vnpay.js';
import helmet from "helmet";
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from "cookie-parser";
import multer from "multer";
import rateLimit from "express-rate-limit";
import cors from "cors";
import router_banner from './router/banner_router.js'
import router_blog from './router/blog_router.js'

var upload = multer()

app.use(cookieParser());
app.use(mongoSanitize({ allowDots: true }))
app.use(upload.array('images', 100))

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


app.use(helmet())
app.use(Express.json({ limit: '10MB' }));
app.use(Express.urlencoded({ extended: true, limit: "500MB" }));

app.use(rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    keyGenerator: (req, res) => {
        return req.clientIp
    }
}));

app.use("/api/", order_router)
app.use("/api/", router_auth);
app.use("/api/", router_order);
app.use("/api/", router_product);
app.use("/api/", router_category);
app.use("/api/", router_elastic)
app.use("/api/", router_upload)
app.use("/api/", router_chat)
app.use("/api/", router_banner)
app.use("/api/", router_blog)

export default app