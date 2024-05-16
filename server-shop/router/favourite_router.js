import { Router } from "express";

import { authRole, checkAuth } from "../middleware/check_auth.js";
import { addFavourite, deleteFavourite, getFavourite } from "../controllers/favourite_controller.js";

const router = Router();

router.post("/favourite", checkAuth, authRole([0]), addFavourite)

router.delete("/favourite", checkAuth, authRole([0]), deleteFavourite)

router.get("/favourite", checkAuth, authRole([0]), getFavourite)



export default router;