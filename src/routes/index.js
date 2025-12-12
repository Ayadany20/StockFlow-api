import { Router } from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import productRoutes from "./product.routes.js";
import categoryRoutes from "./category.routes.js";
import providerRoutes from "./provider.routes.js";
import inventorymovementRoutes from "./movement.routes.js";
import alertRoutes from "./alert.routes.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "API funcionando correctamente" });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/providers", providerRoutes);
router.use("/inventory-movements", inventorymovementRoutes);
router.use("/alerts", alertRoutes);

export default router;
