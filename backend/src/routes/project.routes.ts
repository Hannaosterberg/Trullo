import { Router } from "express";
import { createProject, deleteProject, getProject, getProjects, updateProject } from "../controllers/project.controllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, getProjects);
router.get("/:id", authMiddleware, getProject);
router.post("/", authMiddleware, createProject);
router.put("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);

export default router;