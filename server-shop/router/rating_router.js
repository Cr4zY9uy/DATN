import { Router } from "express";

import { authRole, checkAuth } from "../middleware/check_auth.js";
import { add_product_validator, edit_product_validator } from "../validator/product_validator.js";
import { add_rating, all_rating, detail_rating, paginate_rating, rating_product, update_rating } from "../controllers/rating_controller.js";

const router = Router();

router.post('/rating', checkAuth, add_rating)

router.put('/rating/:id', update_rating)

router.get('/rating', paginate_rating)
router.get('/rating/:id', detail_rating)
router.get('/rating/options/all', all_rating)
router.get('/rating/product/:product_id', rating_product)

export default router;