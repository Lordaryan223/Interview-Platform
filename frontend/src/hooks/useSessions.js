import {useMutation, useQuery} from "@tanstack/react-query"
import toast from "react-hot-toast"
import { sessionApi } from "../api/session"
import { useAuth } from "@clerk/clerk-react";


export const useCreateSession = () => {
  const { getToken } = useAuth();
  return useMutation({
     mutationFn: async (data) => {
      const token = await getToken(); // ✅ GET TOKEN
      return sessionApi.createSession(data, token);
    },

    onSuccess: (data) => {
      toast.success("session created successfully");

      console.log("CREATE SESSION RESPONSE:", data); // 🔍 debug
    },

    onError: (error) =>
      toast.error(error.response?.data?.message || "failed to create room"),
  });
};


export const useActiveSessions=()=>{
    const { getToken } = useAuth();
    const result=useQuery({
        queryKey:["activeSessions"],
        queryFn: async () => {
      const token = await getToken();
      return sessionApi.getActiveSessions(token);
    },
    }) 
    return result
}

export const useMyRecentSession=()=>{
  const { getToken } = useAuth();

  const result = useQuery({
    queryKey: ["myRescentSessions"],
    queryFn: async () => {
      const token = await getToken();
      return sessionApi.getMyRecentSessions(token);
    },
  })
  return result
}

export const useSessionById=(id)=>{
    const result=useQuery({
        queryKey:["session",id],
        queryFn:()=> sessionApi.getSessionById(id),
        enabled: !!id,
        refetchInterval:5000, // refetch every 5sec to detects session status changes 

    }) 
    return result
}


export const useJoinSession=()=>{
     const result = useMutation({
          mutationKey:["joinSession"],
          mutationFn:sessionApi.joinSession,
          onSuccess:()=>toast.success("joined session successfully"),
          onError:(error)=>toast.error(error.response?.data?.message|| "cound not join session")

     })
     return result
}
export const useEndSession=()=>{

        const result = useMutation({
             mutationKey:["endSession"],
             mutationFn:sessionApi.endSession,
             onSuccess:()=>toast.success("ended session successfully"),
             onError:(error)=>toast.error(error.response?.data?.message|| "Failed to exit session ")

    
        })
        return result   
}