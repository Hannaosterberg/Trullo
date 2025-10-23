import { UserModel } from "../models/user.model.js";
import { Request, Response } from "express";
import { z } from "zod";
import mongoose from "mongoose";
import { RequestWithUser } from "../middlewares/authMiddleware.js";

const userSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8)
});

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find().select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ 
            error: "Failed to fetch users", 
            details: (err as Error).message });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if(!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid UserID"})
        }
        const user = await UserModel.findById(id).select("-password");

        if(!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ 
            error: "Failed to fetch user", 
            details: (err as Error).message });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const parsed = userSchema.safeParse(req.body);
        if(!parsed.success) return res.status(400).json({ error: parsed.error.issues});
    
        const newUser = new UserModel(req.body);

        await newUser.save();

        res.status(201).json({ 
            id: newUser._id, 
            name: newUser.name, 
            email: newUser.email});
    } catch (err) {
        res.status(500).json({ 
            error: "Failed to create user", 
            details: (err as Error).message });
    }
};

export const updateUser = async (req: RequestWithUser, res: Response) => {
    try {
        const { id } = req.params;
        if(!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid UserID"})
        }

        const requesterRole = req.user!.role;
        const requesterId = req.user!.id;

        if(requesterRole !== "admin" && requesterId.toString() !== id.toString()) {
            return res.status(403).json({ error: "Forbidden" });
        }

        const user = await UserModel.findByIdAndUpdate(
            id, 
            req.body,
            { new: true, runValidators: true });

        if(!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ 
            error: "Failed to update user", 
            details: (err as Error).message });
    }
};

export const deleteUser = async (req: RequestWithUser, res: Response) => {
    try {
        const { id } = req.params;
        if(!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid UserID"})
        }
        const requesterRole = req.user!.role;
        const requesterId = req.user!.id;
        
        if(requesterRole !== "admin" && requesterId !== id) {
            return res.status(403).json({ error: "Forbidden" });
        }
        
        const user = await UserModel.findByIdAndDelete(id);

        if(!user) return res.status(404).json({ error: "User not found" });

        res.json({ message: "User deleted", user});
    } catch (err) {
        res.status(500).json({ 
            error: "Failed to delete user", 
            details: (err as Error).message });
    }
};