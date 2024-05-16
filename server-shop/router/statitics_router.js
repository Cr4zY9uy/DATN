import { Router } from "express";
import { count_order, count_product_category, count_statitics, countDailyOrders, countMonthlyOrders, unsold } from "../controllers/statitics_controller.js";
import { authRole, checkAuth } from "../middleware/check_auth.js";

const router = Router()


router.get("/count_product_category", checkAuth, authRole([2]), count_product_category)

router.get("/count_order", checkAuth, authRole([2]), count_order)

router.get("/count_statitics", checkAuth, authRole([2]), count_statitics)


router.get("/order_per_month", checkAuth, authRole([2]), countMonthlyOrders)

router.get("/order_per_day", checkAuth, authRole([2]), countDailyOrders)

router.get("/unsold", checkAuth, authRole([2]), unsold)


export default router