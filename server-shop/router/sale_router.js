import { Router } from "express";

import { add_sale, all_sale, delete_sale, detail_sale, lastest_sale, paginate_sale, updateSale } from "../controllers/sale_controller.js";
import { authRole, checkAuth } from "../middleware/check_auth.js";
import { create_validator, edit_validator } from "../validator/sale_validator.js";

const router = Router();

router.post('/sale', checkAuth, authRole([2]), create_validator, add_sale)

router.put('/sale/:id', checkAuth, authRole([2]), edit_validator, updateSale)

router.get('/sale', checkAuth, authRole([2]), paginate_sale)
router.get('/sale/:id', checkAuth, authRole([2]), detail_sale)
router.get('/sale/options/all', all_sale)
router.get('/sale/lastest/products', lastest_sale)

router.delete('/sale/:id', checkAuth, authRole([2]), delete_sale)

export default router;