import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore=create((set)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,

    getUsers:async()=>{
        try {
            set({isUserLoading:true})
            const res= await axiosInstance.get("/message/users")
            set({users:res.data})
            
            
        } catch (error) {
            console.log(error.response?.data?.message)
        }
        finally{
            set({isUserLoading:false})
        }
    },
    getMessages:async(userId)=>{
        try {
            const res= await axiosInstance.get(`/messages/${userId}`)
            set({messages:res.data})
            
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    },
    setSelectedUser:(selectedUser)=>set({selectedUser})
}))