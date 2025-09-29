import express from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET all
router.get("/", authMiddleware, getUsers);
//GET one
router.get("/:id", authMiddleware, getUser)
// CREATE user
router.post("/", createUser)
// UPDATE user
router.put("/:id", authMiddleware, updateUser)
//DELETE user
router.delete("/:id", authMiddleware, deleteUser)

export default router;