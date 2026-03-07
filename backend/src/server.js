import express from "express";
import path from "path";
import apiRoutes from "./routes/api.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import dotenv from "dotenv";
import cors from "cors"
import { functions } from "./lib/inngest.js";
import {serve} from "inngest/express";
import { inngest } from "./lib/inngest.js";





dotenv.config();

const app = express();

//middleware
app.use(express.json());
// credentials:true => erver allow a browser to include cookie on request
app.use(cors({origin:ENV.CLIENT_URL, credentials:true }))

// 🔹 API routes first
app.use("/api", apiRoutes);


app.use("/api/inngest",serve({client:inngest, functions}))

// 🔹 Serve frontend
const __dirname = path.resolve();

app.route("/health").get((req,res)=>{
   res.json({message:"health is good "})
})


app.route("/books").get((req,res)=>{
   res.json({message:"book is good"});

})

app.use(express.static(path.join(__dirname, "../frontend/dist")));

// 🔹 React router fallback (VERY IMPORTANT)
app.get((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const PORT = process.env.PORT || 8000;



const startServer=async()=>{
   try{
     await connectDB();
     app.listen(ENV.PORT,()=>{
      console.log("server is running on port",ENV.PORT);
   })
   }catch(error){
         console.log("error starting the server",error)

   }
}

startServer();
