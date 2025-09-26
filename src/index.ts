import  express  from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/users", userRoutes)
app.use("/tasks", taskRoutes)
app.use("/auth", authRoutes)


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