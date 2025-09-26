import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
    if(!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI");
    
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "trullo",
            serverSelectionTimeoutMS: 5000,
            tls: true,
            tlsAllowInvalidCertificates: true,
        });
        console.log("MongoDB connected");
    } catch(err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
}