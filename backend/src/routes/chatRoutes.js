
import express from "express";
import { getStreamToken } from "../controllers/lib/middleware/models/routes/chatController.js";
import { protectRoute } from "../middleware/protectRoutes.js";

const router = express.Router()

router.get("/token",protectRoute,getStreamToken)

export default router;