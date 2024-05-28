import { Router } from "express";

import { add_consignment, all_consignment, detail_consignment, paginate_consignment, update_consignment } from "../controllers/consignment_controller.js";
import { authRole, checkAuth } from "../middleware/check_auth.js";
import { create_validator, edit_validator } from "../validator/consignment_validator.js";

const router = Router();

router.post('/consignment', checkAuth, authRole([2]), create_validator, add_consignment)

router.put('/consignment/:id', checkAuth, authRole([2]), edit_validator, update_consignment)

router.get('/consignment', checkAuth, authRole([2]), paginate_consignment)
router.get('/consignment/:id', checkAuth, authRole([2]), detail_consignment)
router.get('/consignment/options/all', checkAuth, authRole([2]), all_consignment)


export default router;