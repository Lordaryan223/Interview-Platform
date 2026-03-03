import express from "express";
import path from "path";
import apiRoutes from "./routes/api.js";

const app = express();

app.use(express.json());

// 🔹 API routes first
app.use("/api", apiRoutes);

// 🔹 Serve frontend
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "../frontend/dist")));

// 🔹 React router fallback (VERY IMPORTANT)
app.get( (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);