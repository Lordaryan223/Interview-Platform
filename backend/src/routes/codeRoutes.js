import express from "express";
import { runCode } from "../controllers/lib/middleware/models/routes/codeController.js"
const router = express.Router();

router.post("/run", runCode);

export default router;