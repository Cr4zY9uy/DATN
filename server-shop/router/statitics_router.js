import { Router } from "express";
import { count_order, count_product_category, count_statitics, countDailyOrders, countMonthlyOrders } from "../controllers/statitics_controller.js";

const router = Router()


router.get("/count_product_category", count_product_category)

router.get("/count_order", count_order)

router.get("/count_statitics", count_statitics)


router.get("/order_per_month", countMonthlyOrders)

router.get("/order_per_day", countDailyOrders)

export default router