import { Router } from "express";
import {
    // edit_product,
    delete_product_one,
    delete_product_list,
    delete_product_all,
    detail_product,
    // add_product,
    new_product,
    category_product,
    all_product,
    product_by_category,
    paginate_product,
    add_product,
    edit_product,
    recommend_product,
    product_may_like
} from "../controllers/product_controller.js";
import { authRole, checkAuth } from "../middleware/check_auth.js";
import { add_product_validator, edit_product_validator } from "../validator/product_validator.js";

const router = Router();


// router.post("/product/add", checkAuth, add_product_validator, add_product);

router.put("/product/:id", checkAuth, authRole([2]), edit_product_validator, edit_product);

router.post("/product", checkAuth, authRole([2]), add_product_validator, add_product);


router.get("/product/options/all", all_product);
router.get("/product/:id", detail_product);
router.get('/product/recommend/:id', recommend_product)
router.get('/product/may_like/test', product_may_like)

router.get("/product/new", new_product);
router.get("/product/category/:name", category_product);
router.get('/product', paginate_product)
router.get("/product/category_detail/:id", product_by_category)

router.delete("/product/:id", checkAuth, authRole([2]), delete_product_one);
router.delete("/product", checkAuth, authRole([2]), delete_product_list);
router.delete("/product", checkAuth, authRole([2]), delete_product_all);


export default router;