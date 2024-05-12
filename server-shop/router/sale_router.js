import { Router } from "express";

import { authRole, checkAuth } from "../middleware/check_auth.js";
import { add_product_validator, edit_product_validator } from "../validator/product_validator.js";
import { add_sale, all_sale, delete_sale, detail_sale, paginate_sale, updateSale } from "../controllers/sale_controller.js";

const router = Router();

router.post('/sale', checkAuth, add_sale)

router.put('/sale/:id', updateSale)

router.get('/sale', paginate_sale)
router.get('/sale/:id', detail_sale)
router.get('/sale/options/all', all_sale)


router.delete('/sale/:id', delete_sale)

export default router;