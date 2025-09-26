import express from "express";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/task.controllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();


// GET all
router.get("/", authMiddleware, getTasks)

//GET one
router.get("/:id", authMiddleware, getTask)

// CREATE task
router.post("/", authMiddleware, createTask)

// UPDATE task
router.put("/:id", authMiddleware, updateTask)

//DELETE task
router.delete("/:id", authMiddleware, deleteTask)

export default router;