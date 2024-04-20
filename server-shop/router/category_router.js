import { Router } from "express";
import {
    delete_category_all,
    delete_category_one,
    delete_category_list,
    paginate_category,
    all_category,
    detail_category
} from "../controllers/category_controller.js";
import { checkAuth, authRole } from "../middleware/check_auth.js";
import { add_category_validator, edit_category_validator } from "../validator/category_validator.js";
import { Role } from "../enums/enum.js";
const router = Router();


// router.post("/category/add", checkAuth, add_category_validator, add_category);

// router.put("/category/edit/:id", checkAuth, edit_category_validator, edit_category);

router.get("/category", checkAuth, authRole([Role.CUSTOMER]), all_category);
router.get("/category_paginate", paginate_category);
router.get("/category_detail/:id", detail_category);

router.delete("/category/delete/:id", checkAuth, delete_category_one);
router.delete("/category/delete_list", checkAuth, delete_category_list);
router.delete("/category/delete_all", checkAuth, delete_category_all);

export default router;