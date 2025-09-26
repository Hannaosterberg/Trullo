import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";
import { Request, Response } from "express";
import mongoose from "mongoose";

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await TaskModel.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch all tasks", err });
    }
};

export const getTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid task ID" });
        }
        const task = await TaskModel.findById(req.params.id);
        if(!task) return res.status(404).json({ error: "Task not found" });

        res.json(task);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch task by id", err });
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description, status, assignedTo } = req.body;

        if(assignedTo) {
            const user = await UserModel.findById(assignedTo)
            if(!user) {
                return res.status(400).json({ error: "Assigned user does not exist"})
            }
        }
        const newTask = new TaskModel({
            title,
            description,
            status,
            assignedTo: assignedTo || null
        });

        await newTask.save();

        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: "Failed to create task", err });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid task ID" });
        }
        if(req.body.assignedTo) {
            if (!mongoose.Types.ObjectId.isValid(req.body.assignedTo)) {
                return res.status(400).json({ error: "Invalid assigned user ID" });
            }
            const user = await UserModel.findById(req.body.assignedTo);
            if(!user) return res.status(400).json({ error: "Assigned user does not exist" });
        }

        await TaskModel.findByIdAndUpdate(
            id,
            req.body,
            {  new: true, runValidators: true });

        const updatedTask = await TaskModel.findById(id);
        
        if(!updatedTask) return res.status(404).json({ error: "Task not found" });

        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: "Failed to update task", err });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const task = await TaskModel.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ error: "Task not found" });

        res.json(task);
    } catch (err) {
        res.status(500).json({ error: "Failed to delete task", err });
    }
};