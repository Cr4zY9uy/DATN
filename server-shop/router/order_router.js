import { Router } from "express";
import {
    add_order,
    edit_order,
    detail_order,
    all_order,
    paginate_order,
    order_by_user,

} from "../controllers/order_controller.js";
import { add_order_validator, edit_order_validator } from "../validator/order_validator.js";
import { checkAuth } from "../middleware/check_auth.js";

const router = Router();


router.post("/order", add_order);

router.put("/order/:id", edit_order);

router.get("/order/options", all_order);
router.get("/order", paginate_order);
router.get("/order/:id", detail_order);
router.get("/order/user/:userId", order_by_user)

export default router;