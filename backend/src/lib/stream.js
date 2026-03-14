import {StreamChat} from "stream-chat";
import {ENV} from "./env.js"
import {StreamClient} from "@stream-io/node-sdk"

const apiKey= ENV.STREAM_API_KEY
const apiSecret=ENV.STREAM_API_SECRET

if(!apiKey || !apiSecret){
    console.log("apikey or api secret key is missing")

}

export const streamClient= new StreamClient(apiKey,apiSecret) //this will be used for video calls
export const chatClient=StreamChat.getInstance(apiKey,apiSecret) //this will be used for chat

export const upsertStreamUser=async(userData)=>{

    try{
await chatClient.upsertUser(userData)
return userData
    }

    catch(error){
        console.error("error up upserting user",error)
    }
}


// 

 export const deleteStreamUser=async(userId)=>{

    try{
await chatClient.deleteUser(userId)
console.log("stream user deleted successfully ")
    }
    catch(error){
        console.error("error deleting stream User",error)
    }
   

}

