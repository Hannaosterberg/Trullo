import mongoose, { Schema } from "mongoose";

export interface User {
    name: string;
    email: string;
    password: string; 
}

const userSchema = new Schema<User>(
    {
        name: { type: String, required: true, },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    { timestamps: true, collection: "users" }
);

export const UserModel = mongoose.model<User>("User", userSchema);