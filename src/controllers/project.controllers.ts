import { Request, Response } from "express";
import mongoose from "mongoose";
import { RequestWithUser } from "../middlewares/authMiddleware.js";
import { ProjectModel } from "../models/project.model.js";
import { UserModel } from "../models/user.model.js";

export const getProjects = async (req: Request, res: Response) => {
    try {
        const projects = await ProjectModel.find() 
        res.json(projects)
    } catch (err) {
        res.status(500).json({ 
            error: "Failed to fetch all projects",
            details: (err as Error).message})
    }
}

export const getProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if(!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid project ID" });
        }
        const project = await ProjectModel.findById(id);
        if(!project) return res.status(404).json({ error: "Project not found" });
        res.json(project);
    } catch (err) {
        res.status(500).json({ 
            error: "Failed to fetch project by id",
            details: (err as Error).message})
    }
}

export const createProject = async (req: RequestWithUser, res: Response) => {
    try {
        const { name, description, owner, members } = req.body;
        if(owner) {
            const user = await UserModel.findById(owner)
            if(!user) {
                return res.status(400).json({ error: "Owner does not exist"})
            }
        }
        const newProject = new ProjectModel({
            name,
            description,
            owner: req.user!.id,
            members
        })

        await newProject.save();
        res.status(201).json({ message: "New project created: ", newProject})
    } catch (err) {
        res.status(500).json({ 
            error: "Failed to create project", 
            details: (err as Error).message });
    }
}

export const updateProject = async (req: RequestWithUser, res: Response) => {
    try {
        const { id } = req.params;
        if(!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid project ID" });
        }

        if(req.body.owner) {
            if (!mongoose.Types.ObjectId.isValid(req.body.owner)) {
                return res.status(400).json({ error: "Invalid owner ID" });
            }
            const user = await UserModel.findById(req.body.owner);
            if(!user) return res.status(400).json({ error: "Owner does not exist" });
        }

        const existing = await ProjectModel.findById(id);
        if(!existing) return res.status(404).json({ error: "Project not found" });

        const requesterRole = (req.user as any).role;
        const requesterId = (req.user as any).id;

        if(requesterRole !== "admin" && existing.owner?.toString() !== requesterId) {
            return res.status(403).json({ error: "Forbidden" });
        }

        const project = await ProjectModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true});

        res.json(project);
    } catch (err) {
        res.status(500).json({ 
            error: "Failed to update project", 
            details: (err as Error).message });
    }
}

export const deleteProject = async (req: RequestWithUser, res: Response) => {
    try {
        const { id } = req.params;
        if(!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid project ID" });
        }

        const existing = await ProjectModel.findById(id);
        if(!existing) return res.status(404).json({ error: "Project not found" });
        
        const requesterRole = (req.user as any).role;
        const requesterId = (req.user as any).id;

        if(requesterRole !== "admin" && existing.owner?.toString() !== requesterId) {
            res.status(403).json({ error: "Forbidden" });
        }

        const project = await ProjectModel.findByIdAndDelete(id);
        res.json({ message: "Project Deleted:", project });
    } catch (err) {
        res.status(500).json({ 
            error: "Failed to delete project",
            details: (err as Error).message });
    }
}