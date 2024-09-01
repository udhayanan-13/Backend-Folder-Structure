import { Router } from "express";
import {
  signUp,
  login,
  requestPasswordReset,
  resetPassword,
} from "../controllers/authController.js";

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);

export default router;
