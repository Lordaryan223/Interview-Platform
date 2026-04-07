import { chatClient, streamClient } from "../lib/stream.js";
import  Session  from "../models/Session.js";

export async function createSession(req, res) {
  try {
    console.log("🔥 createSession HIT");

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { problem, difficulty } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    if (!problem || !difficulty) {
      return res.status(400).json({ message: "problem and difficulty are required" });
    }

    const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const session = await Session.create({
      problem,
      difficulty,
      host: userId,
      callId,
    });

    res.status(200).json({ session });

  } catch (error) {
    console.log("❌ ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function getActiveSessions(_,res) {
   try {
     const session = await Session.find({status:"active"})
     .populate("host","name email profileImage clerkId")
     .populate("participants","name email clerkId profileImage")
     .sort({createdAt:-1})
     .limit(20)

     res.status(200).json({session})

   } catch (error) {
    console.log("Error in getActiveSession controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
    
   }


  
}
export async function getMyRecentSessions(req,res) {
    try {
        const userId=req.userId;

        const session=await Session.find(
            {
                status:"completed",
                $or:[{host:userId},{participant:userId}]
            })
            .sort({createdAt:-1})
            .limit(20)

            res.status(200).json({session})

    } catch (error) {
    console.log("Error in getActiveSession controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
    
   }
    
}

export async function getSessionId(req,res) {
    try {
        const {id}=req.params;  // we have to declare a const whhich we have in our findbyid Route and that is id
        const session = await Session.findById(id)
        .populate("host","name email clerkId profileImage")
        .populate("participants","name email clerkId profileImage")

        if(!session){
          return  res.status(404).json({msg:"session not found"})
        }
        res.status(200).json({session})

       

    } catch (error) {
        console.error("could get the session", error.message)
        res.status(400).json({msg:"could't find the session by id"})
        
    }


    
}

export async function joinSession(req,res) {
    try {
        const {id}=req.params;
        const userId=req.user._id
        const clerkId=req.user.clerkId

        const session = await Session.findById(id)
        if(!session){
         return   res.status(404).json({msg:"session not found for join"})

        }
        if(session.status!=="active"){
            return res.status(400).json({msg:"cannot join complete session"})
        }

        if(session.host.toString()===userId.toString()){
          return   res.status(400).json({msg:"host can not join as a participant"})
        }
        
      const alreadyJoined = session.participants.some(p => p.toString() === userId.toString())
if (!alreadyJoined && session.participants.length >= 1) {
    return res.status(409).json({ msg: "session is full" })
}
if (!alreadyJoined) {
    session.participants.push(userId)
    await session.save()
}

        const channel= chatClient.channel("messaging",session.callId)
        await channel.addMembers([clerkId])

        res.status(200).json({session})

        

    } catch (error) {
        console.log("Error in joinSession controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
    
    
}
export async function endSession(req,res) {
    
    try {
        const {id}=req.params
        const userId=req.user._id

        const session= await Session.findById(id)

        if(!session){
            return   res.status(404).json({msg:"session not found for join"})
        }

        if(session.host.toString()!==userId.toString()){
         return   res.status(403).json({msg:"only host can end the session"})
        }
        if(session.status==="completed"){
          return res.status(400).json({msg:"session is already completed"})
        }
        session.status="completed"
        await session.save()

        const call=streamClient.channel("messaging",session.callId)
        await call.delete({hard:true})

        const channel=chatClient.channel("messaging",session.callId)
        await channel.delete()
            res.status(200).json({session,msg:"session ended successfully"})
    } catch (error) {
        console.log("Error in endSession controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }

    
}
