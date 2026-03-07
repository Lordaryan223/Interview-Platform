import express from "express";
import path from "path";
import apiRoutes from "./routes/api.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(express.json());

// 🔹 API routes first
app.use("/api", apiRoutes);

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
