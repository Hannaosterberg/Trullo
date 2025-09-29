import mongoose, { Schema, Document } from "mongoose";

export interface Project extends Document {
    name: string;
    description?: string;
    owner: mongoose.Types.ObjectId;
    members?: mongoose.Types.ObjectId[];
}

const ProjectSchema = new Schema<Project>({
    name: { type: String, required: true },
    description: { type: String },
    owner: { type: Schema.Types.ObjectId,
                ref: "User",
                required: true
    },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true, collection: "projects" });

export const ProjectModel = mongoose.model<Project>("Project", ProjectSchema)