import  express  from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
import authRoutes from "./routes/auth.route.js";
import projectRoutes from "./routes/project.routes.js"
import cors from "cors";

dotenv.config();

const app = express();
const allowOrigins = [
    process.env.CLIENT_URL || "http://localhost:3001",
    "http://localhost:3000",
];
app.use(cors({
    origin: (origin, callback) => {
        if(!origin) return callback(null, true);
        if(allowOrigins.includes(origin)) return callback(null, true);
        callback(new Error("CORS policy: origin not allowed"));
    },
    credentials: true,
}));
app.use(express.json());

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);


await connectDB()
    .then(() => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT} `)
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });