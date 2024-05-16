import { Router } from "express";

import { authRole, checkAuth } from "../middleware/check_auth.js";
import { add_product_validator, edit_product_validator } from "../validator/product_validator.js";
import { add_sale, all_sale, delete_sale, detail_sale, lastest_sale, paginate_sale, updateSale } from "../controllers/sale_controller.js";

const router = Router();

router.post('/sale', checkAuth, authRole([2]), checkAuth, add_sale)

router.put('/sale/:id', checkAuth, authRole([2]), updateSale)

router.get('/sale', checkAuth, authRole([2]), paginate_sale)
router.get('/sale/:id', checkAuth, authRole([2]), detail_sale)
router.get('/sale/options/all', all_sale)
router.get('/sale/lastest/products', lastest_sale)

router.delete('/sale/:id', checkAuth, authRole([2]), delete_sale)

export default router;