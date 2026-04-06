import express from "express"
import { protectRoute } from "../middleware/protectRoutes.js";
import { createSession,
    endSession,
    getActiveSessions,
    getMyRecentSessions,
    getSessionId,
    joinSession
         } from "../controllers/sessionController.js";

const router=express.Router();

router.post("/create", (req, res, next) => {
  console.log("🔥 POST /api/sessions HIT");
  next();
}, protectRoute, createSession);

router.get("/active",protectRoute,getActiveSessions)
router.get("/my-recent",protectRoute,getMyRecentSessions)

router.get("/:id",protectRoute,getSessionId)
router.post("/:id/join",protectRoute,joinSession)
router.patch("/:id/end",protectRoute,endSession)





export default router;