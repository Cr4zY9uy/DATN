import { Router } from "express";

import { authRole, checkAuth } from "../middleware/check_auth.js";
import { add_product_validator, edit_product_validator } from "../validator/product_validator.js";
import { add_consignment, all_consignment, detail_consignment, paginate_consignment, update_consignment } from "../controllers/consignment_controller.js";

const router = Router();

router.post('/consignment', checkAuth, add_consignment)

router.put('/consignment/:id', update_consignment)

router.get('/consignment', paginate_consignment)
router.get('/consignment/:id', detail_consignment)
router.get('/consignment/options/all', all_consignment)


export default router;