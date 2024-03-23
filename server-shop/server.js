import Express from "express";
import router_auth from "./router/user_router.js";
import router_product from "./router/product_router.js";
import router_category from "./router/category_router.js";
import router_order from "./router/order_router.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = Express();
dotenv.config();

app.use(Express.json({ limit: '10MB' }));
app.use(Express.urlencoded({ extended: true, limit: "60mb" }));
app.use(cors({ credentials: true, origin: ["http://localhost:3000", "http://localhost:3001"] }));
app.use(cookieParser());

app.use("/api/", router_auth);
app.use("/api/", router_order);
app.use("/api/", router_product);
app.use("/api/", router_category);


mongoose.connect(process.env.URL_DB)
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err.message);
    });

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
