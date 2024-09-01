import { Router } from "express";
import { getAllUsers } from "../controllers/adminController.js";
import { updateUserStatus } from "../controllers/adminController.js";

const router = Router();

router.get("/get-all-users", getAllUsers);
router.patch("/update-user-status", updateUserStatus);

export default router;
