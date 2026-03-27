import {useMutation, useQuery} from "@tanstack/react-query"
import toast from "react-hot-toast"
import { sessionApi } from "../api/session"


export const useCreateSession=()=>{
    const result=useMutation({
     
        mutationFn:(data)=>sessionApi.createSession(),
        onSuccess:()=>toast.success("session created successfullt"),
        onError:(error)=>toast.error(error.response?.data?.message || "failed to crate room")
    })
    return result
}


export const useActiveSessions=()=>{
    const result=useQuery({
        queryKey:["activeSessions"],
        queryFn:()=> sessionApi.getActiveSessions()
    }) 
    return result
}

export const useMyRescentSession=()=>{
    const result=useQuery({
        queryKey:["myRescentSessions"],
        queryFn:()=> sessionApi.getMyRecentSessions()
    }) 
    return result
}

export const useSessionById=(id)=>{
    const result=useQuery({
        queryKey:["session",id],
        queryFn:()=> sessionApi.getSessionId(id),
        enabled: !!id,
        refetchInterval:5000, // refetch every 5sec to detects session status changes 

    }) 
    return result
}


export const useJoinSession=()=>{
     const result = useMutation({
          mutationKey:["joinSession"],
          mutationFn:sessionApi.joinSession(),
          onSuccess:()=>toast.success("joined session successfully"),
          onError:()=>toast.error(error.response?.data?.message|| "cound not join session")

     })
     return result
}
export const useEndSession=()=>{
    const result = useMutation({
         mutationKey:["endSession"],
         mutationFn:sessionApi.endSession(),
         onSuccess:()=>toast.success("ended session successfully"),
         onError:()=>toast.error(error.response?.data?.message|| "Failed to exit session ")

    })
    return result
}