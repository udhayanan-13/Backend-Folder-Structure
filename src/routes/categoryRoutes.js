import { Router } from "express";
import { addCategory, getCategory,updateCategory } from "../controllers/categoryController.js";
const router = Router();

router.post("/add-category", addCategory);
router.get("/get-all-category", getCategory);
router.patch("/update-category",updateCategory)
export default router;
