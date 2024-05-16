import { Router } from "express";

import { authRole, checkAuth } from "../middleware/check_auth.js";
import { add_product_validator, edit_product_validator } from "../validator/product_validator.js";
import { add_consignment, all_consignment, detail_consignment, paginate_consignment, update_consignment } from "../controllers/consignment_controller.js";

const router = Router();

router.post('/consignment', checkAuth, authRole([2]), add_consignment)

router.put('/consignment/:id', checkAuth, authRole([2]), update_consignment)

router.get('/consignment', checkAuth, authRole([2]), paginate_consignment)
router.get('/consignment/:id', checkAuth, authRole([2]), detail_consignment)
router.get('/consignment/options/all', checkAuth, authRole([2]), all_consignment)


export default router;