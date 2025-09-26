import express from "express";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/task.controllers.js";

const router = express.Router();


// GET all
router.get("/", getTasks)

//GET one
router.get("/:id", getTask)

// CREATE task
router.post("/", createTask)

// UPDATE task
router.put("/:id", updateTask)

//DELETE task
router.delete("/:id", deleteTask)

export default router;