import { TaskModel } from "../models/task.model.js";
import { Request, Response } from "express";

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
        const task = await TaskModel.findById(req.params.id);
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch task by id", err });
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const newTask = new TaskModel(req.body);

        await newTask.save();

        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: "Failed to create task", err });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const tasks = await TaskModel.findByIdAndUpdate(req.params.id);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Failed to update task", err });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const tasks = await TaskModel.findByIdAndDelete(req.params.id);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Failed to delete task", err });
    }
};