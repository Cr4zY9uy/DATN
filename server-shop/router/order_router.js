import { Router } from "express";
import {
    add_order,
    edit_order,
    detail_order,
    all_order,
    paginate_order,
    delete_order_all,
    delete_order_one,
    delete_order_list
} from "../controllers/order_controller.js";
import { add_order_validator, edit_order_validator } from "../validator/order_validator.js";
import { checkAuth } from "../middleware/check_auth.js";

const router = Router();


router.post("/order/add", add_order);

router.put("/order/edit/:id", checkAuth, edit_order_validator, edit_order);

router.get("/order", all_order);
router.get("/order_paginate", paginate_order);
router.get("/order_detail/:id", detail_order);

router.delete("/order/delete/:id", checkAuth, delete_order_one);
router.delete("/order/delete_list", checkAuth, delete_order_list);
router.delete("/order/delete_all", checkAuth, delete_order_all);

export default router;