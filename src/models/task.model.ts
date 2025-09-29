import mongoose, { Schema, Document } from "mongoose";

export type Status = "to-do" | "in-progress" | "blocked" | "done";
export interface Task extends Document{
    title: string;
    description: string;
    status: Status;
    tags?: string[];
    project?: mongoose.Types.ObjectId | null
    assignedTo?: mongoose.Types.ObjectId | null;
    createdAt: Date;
    updatedAt: Date;
    finishedAt?: Date | null;
    finishedBy?: mongoose.Types.ObjectId | null;
}

const TaskSchema = new Schema<Task>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        status: { 
            type: String, 
            enum: ["to-do", "in-progress", "blocked", "done"],
            default: "to-do"
        },
        tags: [{ type: String }],
        project: { 
            type: Schema.Types.ObjectId, 
            ref: "Project", 
            default: null},
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null 
        },
        finishedAt: { type: Date, default: null },
        finishedBy: { 
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null
        }
    },
    { timestamps: true, collection: "tasks" }
);

// TaskSchema.pre("save", function(next) {
//     if(this.isModified("status")) {
//         if(this.status === "done") {
//             this.finishedAt = new Date()
//         } else {
//             this.finishedAt = null
//         }
//     }
//     next();
// });

// TaskSchema.pre("findOneAndUpdate", function(next) {
//     const update = this.getUpdate() as any;

//     if(update.status) {
//         if(update.status === "done") {
//             update.finishedAt = new Date();
//         } else {
//             update.finishedAt = null;
//         }
//     }
//     this.setUpdate(update);
//     next()
// })
export const TaskModel = mongoose.model<Task>("Task", TaskSchema);
