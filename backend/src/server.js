import express from "express";
import path from "path";
import apiRoutes from "./routes/api.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import dotenv from "dotenv";
import cors from "cors"
import {clerkMiddleware} from "@clerk/express"
import { functions } from "./lib/inngest.js";
import {serve} from "inngest/express";
import { inngest } from "./lib/inngest.js";
import { protectRoute } from "./middleware/protectRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoute from "./routes/sessionRoute.js"
import codeRoutes from "./routes/codeRoutes.js";

dotenv.config();

const app = express();

console.log("🔥 BACKEND VERSION 2");

// 1. Clerk middleware FIRST
app.use(clerkMiddleware())

// 2. CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      process.env.CLIENT_URL,
      'http://localhost:5173',
      'http://localhost:3000',
      'https://interview-platform-r32c.onrender.com'
    ];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
}));

// 3. Body parser
app.use(express.json());

// 4. Request logging (optional)


app.use((req, res, next) => {
  console.log("🔥 REQUEST:", req.method, req.url);
  next();
});

// 5. API ROUTES (these should be FIRST)
app.use("/api/sessions", sessionRoute);
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/code", codeRoutes);
app.use("/api", apiRoutes) 

// 6. Health check routes
app.get("/health", (req, res) => {
  res.json({ message: "health is good" });
});

app.get("/books", (req, res) => {
  res.json({ message: "book is good" });
});

app.get("/video-call", protectRoute, (req, res) => {
  res.status(200).json({ msg: "video call endpoint" });
});

// 7. Root route LAST (catch-all)
app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("✅ Server running on port", PORT);
    });
  } catch (error) {
    console.log("❌ Error starting the server", error);
  }
};

startServer();