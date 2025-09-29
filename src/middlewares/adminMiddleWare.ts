import { Response, NextFunction } from "express";
import { RequestWithUser } from "./authMiddleware.js";

export const adminMiddleWare = (req: RequestWithUser, res: Response, next: NextFunction) => {
    if(!req.user) return res.status(401).json({ error: "Unauthorized" });
    if((req.user as any).role !== "admin") {
        return res.status(403).json({ error: "Admin Only" });
    }
    next();
};