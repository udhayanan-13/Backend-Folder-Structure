import { Router } from "express";
import {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  updateStatus,
} from "../controllers/productController.js";
const router = Router();

router.post("/add-product", addProduct);
router.get("/get-all-products", getProduct);
router.patch("/update-product", updateProduct);
router.delete("/delete-product/:id", deleteProduct);
router.patch("/update-product-status", updateStatus);

export default router;
