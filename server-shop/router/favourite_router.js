import { Router } from "express";

import { authRole, checkAuth } from "../middleware/check_auth.js";
import { addFavourite, deleteFavourite, getFavourite } from "../controllers/favourite_controller.js";

const router = Router();

router.post("/favourite", checkAuth, addFavourite)

router.delete("/favourite", checkAuth, deleteFavourite)

router.get("/favourite", checkAuth, getFavourite)



export default router;