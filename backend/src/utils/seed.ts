import mongoose from "mongoose";
import dotenv from "dotenv";
import { UserModel } from "../models/user.model.js";
import { TaskModel } from "../models/task.model.js";
import { ProjectModel } from "../models/project.model.js";
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mydb";

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: "trullo",
            serverSelectionTimeoutMS: 5000,
            tls: true,
            tlsAllowInvalidCertificates: true,
        });
        console.log("Connected to DB")

        await UserModel.deleteMany({});
        await TaskModel.deleteMany({});
        await ProjectModel.deleteMany({});

        const admin = await UserModel.create({
            name: "Admin User",
            email: "admin@example.com",
            password: "Passw0rd!",
            role: "admin"
        });
        const user = await UserModel.create({
            name: "Regular User",
            email: "user@example.com",
            password: "Passw0rd!",
            role: "user"
        });

        const project1 = await ProjectModel.create({
            name: "Project Alpha",
            description: "First Project",
            owner: admin._id,
            members: [user._id]
        });
        const project2 = await ProjectModel.create({
            name: "Project Beta",
            description: "Second Project",
            owner: user._id,
            members: [admin._id]
        });

        await TaskModel.insertMany([
            {
                title: "Task One",
                description: "First example task",
                status: "to-do",
                tags: ["frontend", "backend"],
                assignedTo: admin._id,
                project: project1._id,
            },
            {
                title: "Task Two",
                description: "Second example task",
                status: "in-progress",
                tags: ["frontend"],
                assignedTo: user._id,
                project: project1._id,
            },
            {
                title: "Task Three",
                description: "Another task",
                status: "done",
                tags: ["backend"],
                assignedTo: admin._id,
                finishedAt: Date(),
                finishedBy: admin._id,
                project: project2._id,
            },
            {
                title: "Task Four",
                description: "Unassigned Task",
                status: "to-do",
                tags: ["example"],
                assignedTo: null,
                project: project1._id
            },
        ]);

        console.log("Seed completed with users, projects and tasks!");
        process.exit(0);
    } catch (err) {
        console.error("Seed Error", err);
        process.exit(1);
    }
}

seed();