import crypto from "crypto";
import { Request, Response } from "express";
import { UserModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const requestPasswordReset = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });
        if(!user) return res.status(200).json({ message: "If that email exists, a reset link has been sent." });
    
        const token = crypto.randomBytes(32).toString("hex");
        const hashed = crypto.createHash("sha256").update(token).digest("hex");

        user.resetPasswordToken = hashed;
        user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 60);
        await user.save();
        
        const resetLink = `${process.env.FRONTEND_URL || "http://localhost:3000"}/reset-password?token=${token}§id=${user._id}`;
        return res.json({ message: "Reset link generated (dev)", resetLink });
    } catch (err) {
        res.status(500).json({ error: "Failed to create reset token", err });
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { userId, token, newPassword } = req.body;
        if(!userId || !token || !newPassword) {
            return res.status(400).json({ error: "Missing Fields" });
        }

        const hashed = crypto.createHash("sha256").update(token).digest("hex");
        const user = await UserModel.findOne({
            _id: userId,
            resetPasswordToken: hashed,
            resetPasswordExpires: { $gt: new Date() }
        });
        if(!user) return res.status(400).json({ error: "Invalid or expired token" });

        user.password = newPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (err) {
        res.status(500).json({ error: "Failed to reset password", err });
        
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if(!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "1h"}
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: "login Failed", err });
    }
}