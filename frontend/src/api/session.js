import axiosInstance from '../lib/axios.js'


export const sessionApi = {


    createSession: async(data) => {
        console.log("🔥 BASE URL:", axiosInstance.defaults.baseURL);
  console.log("🔥 FINAL URL:", axiosInstance.defaults.baseURL + "/sessions/create");

        
        const response = await axiosInstance.post("/sessions/create", data)
        console.log("🔥 RAW RESPONSE:", response);
        return response.data
    },
    getActiveSessions: async() => {
        const response = await axiosInstance.get("/sessions/active")
        return response.data
    },
    getMyRecentSessions: async() => {
        const response = await axiosInstance.get("/sessions/my-recent")
        return response.data
    },
    getSessionById: async(id) => {
        const response = await axiosInstance.get(`/sessions/${id}`)
        return response.data
    },
    joinSession: async(id) => {
        const response = await axiosInstance.post(`/sessions/${id}/join`)
        return response.data
    },
    endSession: async(id) => {
        const response = await axiosInstance.patch(`/sessions/${id}/end`)
        return response.data
    },
    getStreamToken: async() => {
        const response = await axiosInstance.get(`/chat/token`)
        return response.data
    }
}