import {Inngest} from "inngest"
import { connectDB } from "./db.js"
import User from "../models/User.js"

export const inngest = new inngest({id:"talend-iq"})

const syncUser=inngest.createFunction(

        {id:"sync-user"},
        {event:"cler/user.created"},

        async({event})=>{
            await connectDB()

            const { id,emailAddresses,first_name, last_name,img_url }=event.data
            const newUser={
                clerkId:id,
                email:emailAddresses[0]?.emailAddresses,
                name:`${first_name || " "} ${last_name}`,
                profileImage:img_url
            }
await User.create(newUser)


        }


)




const deleteUserFromDb = inngest.createFunction(

    {id:"delete-user-from-db"},
    {event:"cler/user.deleted"},

    async({event})=>{
        await connectDB()

        const { id }=event.data
        const newUser={
            clerkId:id,
            
        }
await User.deleteOne({clerkId:id})
    }
)

export const functions=[syncUser,deleteUserFromDb]