import { getAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
    (req, res, next) => {
        const auth = getAuth(req);
        if (!auth.userId) return res.status(401).json({ message: "unauthorized" });
        req.auth = () => auth; // keep same interface
        next();
    },
    async (req, res, next) => {
        try {
            const { userId: clerkId } = req.auth();
            const user = await User.findOne({ clerkId });
            if (!user) return res.status(404).json({ message: "user not found" });
            req.user = user;
            next();
        } catch (error) {
            res.status(500).json({ message: "internal server error" });
        }
    }
]