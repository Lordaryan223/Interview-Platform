import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute=[
    requireAuth({signInUrl:"/sign-in"}),
    async(req,res,next)=>{
        try{
            const clerkId= req.auth.userId
            if(!clerkId) return res.status(401).json({message:"unauthrized access"})

                const user=await User.findOne({clerkId})
                if(!user) return res.status(404).json({message:"user not found"})
                    req.user=user;
                next();
        }
       
        catch(error){
            console.error(" error in prtectRoute middleware",error)
            res.status(500).json({message:"internal server error"});
        }
    }


]