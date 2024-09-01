import { Router } from "express";

import { changePassword } from "../controllers/userController.js";

const router = Router();

router.patch("/change-password", changePassword);

export default router;
