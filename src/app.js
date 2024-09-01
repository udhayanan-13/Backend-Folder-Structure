import express from "express";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { authenticateToken } from "./middlewares/authentication.js";
import { authorizeAdmin } from "./middlewares/authorization.js";

import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/admin", authenticateToken, authorizeAdmin, adminRoutes);
app.use("/api/category", authenticateToken, authorizeAdmin, categoryRoutes);
app.use("/api/product", authenticateToken, authorizeAdmin, productRoutes);
app.use("/api/user", authenticateToken, userRoutes);

export default app;
