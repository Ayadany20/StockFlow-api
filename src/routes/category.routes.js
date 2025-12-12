import { Router } from "express";
import CategoryController from "../controllers/categoryController.js";

const router = Router();

router.get("/", CategoryController.findAll);
router.get("/:id", CategoryController.findById);
router.post("/", CategoryController.create);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.remove);

export default router;
