import { Router } from "express";
import {
    edit_product,
    delete_product_one,
    delete_product_list,
    delete_product_all,
    detail_product,
    paginate_product,
    add_product,
    hot_product,
    category_product,
    by_name_product,
    by_code_product,
    all_product
} from "../controllers/product_controller.js";
import { checkAuth } from "../middleware/check_auth.js";
import { add_product_validator, edit_product_validator } from "../validator/product_validator.js";

const router = Router();


router.post("/product/add", checkAuth, add_product_validator, add_product);

router.put("/product/edit/:id", checkAuth, edit_product_validator, edit_product);

router.get("/product", all_product);
router.get("/product_paginate", paginate_product);
router.get("/product_detail/:id", detail_product);
router.get("/product/hot", hot_product);
router.get("/product/category/:name", category_product);
router.get("/product/code/:id", by_code_product);
router.get("/product/name/:name", by_name_product);

router.delete("/product/delete/:id", checkAuth, delete_product_one);
router.delete("/product/delete_list", checkAuth, delete_product_list);
router.delete("/product/delete_all", checkAuth, delete_product_all);


export default router;