import { Router } from "express";
import { loginUser, requestPasswordReset, resetPassword } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", loginUser)
router.post("/request-reset", requestPasswordReset)
router.post("/reset", resetPassword)

export default router;