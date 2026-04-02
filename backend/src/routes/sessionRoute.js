import express from "express"
import { protectRoute } from "../middleware/protectRoutes.js";
import { createSession,
    endSession,
    getActiveSessions,
    getMyRecentSessions,
    getSessionId,
    joinSession
         } from "../controllers/lib/middleware/models/routes/sessionController.js";

const router=express.Router();

router.post("/", protectRoute,createSession)
router.get("/active",protectRoute,getActiveSessions)
router.get("/my-recent",protectRoute,getMyRecentSessions)

router.get("/:id",protectRoute,getSessionId)
router.post("/:id/join",protectRoute,joinSession)
router.patch("/:id/end",protectRoute,endSession)



export default router;