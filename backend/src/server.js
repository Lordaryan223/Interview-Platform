 import express from "express";
import { ENV } from "./lib/env.js";
 


 const app=express();


 app.get("/",(req,res)=>{
    res.status(200).json({msg:"success from api nodemon 123"})
 })
 app.listen(ENV.PORT,()=>{
    console.log("server is running on port 3000")
 })