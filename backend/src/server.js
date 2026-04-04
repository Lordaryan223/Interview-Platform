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

//middleware
const allowedOrigins = [
  'http://localhost:5173',                              // Local dev
  'http://localhost:3000',                              // Alternative local
  'https://interview-platform-r32c.onrender.com',       // Production frontend
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use("/api/inngest", serve({
   client: inngest,
   functions
 }));
 app.use("/api/chat",chatRoutes)
 app.use("/api/sessions",sessionRoute)
 
 app.use("/api", apiRoutes);
 app.use(clerkMiddleware()) // app.use middleware is user for all the outes.


 app.use("/api/code", codeRoutes);


// 🔹 Serve frontend
const __dirname = path.resolve();

app.route("/health").get((req,res)=>{
req.auth()
   res.json({message:"health is good "})
})  // app.getis used for specific routes.


app.route("/books").get((req,res)=>{
   res.json({message:"book is good"});

})

app.get("/video-call",protectRoute,(req,res)=>{
   
   res.status(200).json({msg:" video call endpoint"})
})


app.use(express.static(path.join(__dirname, "../frontend/dist")));

// 🔹 React router fallback (VERY IMPORTANT)
app.get("/{*path}", (req, res) => {  // ✅
   res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
 });




const PORT = process.env.PORT || 8000;



const startServer=async()=>{
   try{
     await connectDB();
     app.listen(ENV.PORT,()=>{
      console.log(" ✅server is running on port",ENV.PORT);
   })
   }catch(error){
         console.log("❌error starting the server",error)

   }
}

startServer();
