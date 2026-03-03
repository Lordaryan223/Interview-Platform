 import express from "express";
import { ENV } from "./lib/env.js";
import path from "path"
import { fileURLToPath } from "url";

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = import.meta.dirname;
const app=express();

const __dirname=path.resolve();

 app.get("/health",(req,res)=>{
    res.status(200).json({msg:"success from api nodemon 123"})
 })

 app.get("/books",(req,res)=>{
   res.status(200).json({msg:"this is the book end point"})
})

if (ENV.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "../../frontend/dist")));
 
   app.get(/.*/, (req, res) => {
      res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
    });
 }

 const PORT = process.env.PORT || 5000;
 app.listen(PORT);