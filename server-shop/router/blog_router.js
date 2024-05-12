import { Router } from "express";

import { Role } from "../helper/enum.js";
import { authRole, checkAuth } from "../middleware/check_auth.js";
import { add_blog, all_blog, delete_blog_list, delete_blog_one, detail_blog, paginate_blog, update_blog } from "../controllers/blog_controller.js";
const router = Router();


router.post("/blog", checkAuth, add_blog);

router.put("/blog/:id", update_blog);

router.get("/blog/options", all_blog);
router.get("/blog", paginate_blog);
router.get("/blog/:id", detail_blog);

router.delete("/blog/:id", delete_blog_one);
router.delete("/blog", delete_blog_list);

export default router;