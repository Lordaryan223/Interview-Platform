import express from "express";

const router = express.Router();

// Example test route
router.get("/test", (req, res) => {
  res.json({ message: "API is working 🚀" });
});

export default router;