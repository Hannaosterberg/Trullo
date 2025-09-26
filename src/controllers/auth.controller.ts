import { Request, Response } from "express";
import { UserModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if(!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h"}
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: "login Failed", err });
    }
}