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
import router_rating from './router/rating_router.js'
import router_comment from './router/comment_router.js'
import router_favourite from './router/favourite_router.js'
import router_sale from './router/sale_router.js'
import router_consignment from './router/consignment_router.js'
import router_statitics from './router/statitics_router.js'
import session from "express-session";
import passport from "passport";
import { connectToGoogle } from "./google/google-auth.js";

import cron from 'node-cron'
import consignment_model from "./models/consignment_model.js";
import product_model from "./models/product_model.js";
import order_model from "./models/order_model.js";
import { isToday } from "./helper/function.js";

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: "SECRET",
        // cookie: { maxAge: 172800000 }
    })
);
var upload = multer()

app.use(cookieParser());
app.use(mongoSanitize({ allowDots: true }))
app.use(upload.array('images', 100))

app.use(cors({
    origin: function (origin, callback) {
        // console.log(origin);
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
    max: 1000,
    keyGenerator: (req, res) => {
        return req.clientIp
    }
}));

app.use(passport.initialize());
app.use(passport.session());


cron.schedule("*/5 * * * *", async () => {
    try {
        const consignments = await consignment_model.find();

        for (let consignment of consignments) {
            for (let product of consignment.products) {
                if (isToday(product.expireDate)) {
                    const originalProduct = await product_model.findById(product.productId);
                    if (originalProduct) {
                        const updatedUnSold = originalProduct.quantity.unSold + originalProduct.quantity.inTrade;
                        await product_model.findByIdAndUpdate(product.productId, {
                            $set: {
                                'quantity.inTrade': 0,
                                'quantity.unSold': updatedUnSold
                            }
                        });

                    }
                }
            }
        }
    } catch (error) {
        console.error(error.message);
    }
});

cron.schedule("1-59 * * * *", async () => {
    try {
        const twentyMinutesInMilliseconds = 14 * 60 * 1000;
        const orders = await order_model.find({
            paymentMethod: "vnpay",
            paymentStatus: "unpaid",
            orderStatus: "new",
            createdAt: { $lte: new Date(Date.now() - twentyMinutesInMilliseconds) },
        });

        for (const order of orders) {
            await order_model.findByIdAndUpdate(order._id, { orderStatus: "canceled" });
            for (const product of order.products) {
                const originalProduct = await product_model.findById(product.productId);
                if (originalProduct) {
                    const newInTrade = originalProduct.quantity.inTrade + product.quantity;
                    await product_model.findByIdAndUpdate(product.productId, {
                        $set: { 'quantity.inTrade': newInTrade }
                    });
                }
            }
        }
    } catch (error) {
        console.error(error.message);
    }
});

cron.schedule("1-59 * * * *", async () => {
    try {
        const orders = await order_model.find({
            orderStatus: "canceled"
        });

        for (const order of orders) {
            for (const product of order.products) {
                const originalProduct = await product_model.findById(product.productId);
                if (originalProduct) {
                    const newInTrade = originalProduct.quantity.inTrade + product.quantity;
                    await product_model.findByIdAndUpdate(product.productId, {
                        $set: { 'quantity.inTrade': newInTrade }
                    });
                }
            }
        }
    } catch (error) {
        console.error(error.message);
    }
});



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
app.use("/api/", router_favourite)
app.use("/api/", router_rating)
app.use("/api/", router_comment)
app.use("/api/", router_sale)
app.use("/api/", router_consignment)
app.use("/api/", router_statitics)

connectToGoogle()

export default app