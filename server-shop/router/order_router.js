import { Router } from "express";
import {
    add_order,
    edit_order,
    detail_order,
    all_order,
    paginate_order,
    order_by_user,
    paginate_order_user,

} from "../controllers/order_controller.js";
import { add_order_validator, edit_order_validator } from "../validator/order_validator.js";
import { authRole, checkAuth } from "../middleware/check_auth.js";

const router = Router();


router.post("/order", checkAuth, authRole([0]), add_order);

router.put("/order/:id", checkAuth, authRole([0, 1]), edit_order);

router.get("/order/options", all_order);
router.get("/order", checkAuth, authRole([1]), paginate_order);
router.get("/order/:id", checkAuth, authRole([0, 1]), detail_order);
router.get("/order/user/:userId", checkAuth, authRole([0, 1]), order_by_user)

router.get("/order/user/paginate/:user_id", checkAuth, authRole([0, 1]), paginate_order_user)

export default router;