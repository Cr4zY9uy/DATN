import { Router } from "express";
import {
    add_category,
    all_category,
    delete_category_list,
    delete_category_one,
    detail_category,
    paginate_category,
    product_by_category,
    update_category
} from "../controllers/category_controller.js";
import { Role } from "../helper/enum.js";
import { authRole, checkAuth } from "../middleware/check_auth.js";
const router = Router();


router.post("/category", add_category);

router.put("/category/:id", update_category);

router.get("/category/options", all_category);
router.get("/category", paginate_category);
router.get("/category/:id", detail_category);
router.get("/category/detail/:id", product_by_category);

router.delete("/category/:id", delete_category_one);
router.delete("/category", delete_category_list);

export default router;