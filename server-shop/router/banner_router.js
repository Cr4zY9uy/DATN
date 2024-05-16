import { Router } from "express";

import { Role } from "../helper/enum.js";
import { authRole, checkAuth } from "../middleware/check_auth.js";
import { add_banner, all_banner, delete_banner_list, delete_banner_one, detail_banner, paginate_banner, update_banner } from "../controllers/banner_controller.js";
const router = Router();


router.post("/banner", checkAuth, authRole([2]), add_banner);

router.put("/banner/:id", checkAuth, authRole([2]), update_banner);

router.get("/banner/options", all_banner);
router.get("/banner", paginate_banner);
router.get("/banner/:id", detail_banner);

router.delete("/banner/:id", checkAuth, authRole([2]), delete_banner_one);
router.delete("/banner", checkAuth, authRole([2]), delete_banner_list);

export default router;