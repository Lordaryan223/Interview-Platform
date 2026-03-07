import mongoose from "mongoose";
import {ENV} from "./env.js"

export const connectDB=async() => {
try{
const conn = await mongoose.connect(ENV.DB_URL)
console.log("connected to mongoDB")
}
catch(error){
    console.error("error connecting to mongodb",error)
    process.exit(1) //0 means success , 1 means failure
}
}