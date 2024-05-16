import { Router } from "express";

import { authRole, checkAuth } from "../middleware/check_auth.js";
import { add_product_validator, edit_product_validator } from "../validator/product_validator.js";
import { add_comment, all_comment, comment_of_product, comment_product_paginate, detail_comment, paginate_comment, update_comment } from "../controllers/comment_controller.js";

const router = Router();

router.post('/comment', checkAuth, authRole([0]), add_comment)

router.put('/comment/:id', checkAuth, authRole([2]), update_comment)

router.get('/comment', checkAuth, authRole([2]), paginate_comment)
router.get('/comment/:id', checkAuth, authRole([2]), detail_comment)
router.get('/comment/options/all', all_comment)
router.get('/comment/product/all', comment_of_product)
router.get('/comment/product/paginate/:product_id', comment_product_paginate)

export default router;