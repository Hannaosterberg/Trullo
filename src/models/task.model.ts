import mongoose, { Schema } from "mongoose";
import { UserModel } from "./user.model.js";

export type Status = "to-do" | "in-progress" | "blocked" | "done";
export interface Task {
    title: string;
    description: string;
    status: Status;
    assignedTo?: mongoose.Types.ObjectId | null;
    createdAt: Date;
    updatedAt: Date;
    finishedAt: Date | null;
}

const TaskSchema = new Schema<Task>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        status: { 
            type: String, 
            enum: ["to-do", "in-progress", "blocked", "done"],
            required: true
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null 
        },
        finishedAt: { type: Date, default: null }
    },
    { timestamps: true, collection: "tasks" }
);


export const TaskModel = mongoose.model<Task>("Task", TaskSchema);
