import express from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/user.controllers.js";

const router = express.Router();

// GET all
router.get("/", getUsers);
//GET one
router.get("/:id", getUser)
// CREATE user
router.post("/", createUser)
// UPDATE user
router.put("/:id", updateUser)
//DELETE user
router.delete("/:id", deleteUser)

export default router;