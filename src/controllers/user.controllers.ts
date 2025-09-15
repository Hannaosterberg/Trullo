import { UserModel } from "../models/user.model.js";
import { Request, Response } from "express";


export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users", err });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.params.id);

        if(!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch user", err });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = new UserModel(req.body);

        await newUser.save();

        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: "Failed to create user", err });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if(!user) return res.status(404).json({ error: "User not found" });
        
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Failed to update user", err });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);

        if(!user) return res.status(404).json({ error: "User not found" });

        res.json({ message: "User deleted", user});
    } catch (err) {
        res.status(500).json({ error: "Failed to update user", err });
    }
};