import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import {useAuthStore} from "./userAuthStore"

export const useChatStore=create((set,get)=>({
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
            const res= await axiosInstance.get(`/message/${userId}`)
            set({messages:res.data})
            
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    },
    sendMessages:async(messageData)=>{
        const {selectedUser,messages}=get()
        try {
            const res= await axiosInstance.post(`message/send/${selectedUser._id}`,messageData);
            set({messages:[...messages,res.data]})
        } catch (error) {
            toast.error(error.response?.data?.message)
        }

    },
    subscribeToMessages:()=>{
        const {selectedUser}=get()
        if(!selectedUser) return;
         const  socket=useAuthStore.getState().socket
        socket.on("newMessage",(newMessage)=>{
            const isMessageSentFromSelectedUser=newMessage.senderId===selectedUser._id
            if(!isMessageSentFromSelectedUser) return
            set({
                messages:[...get().messages,newMessage]
            })
        })
    },
    unsubscribeFromMessages:()=>{
        const socket= useAuthStore.getState().socket
        socket.off("newMessage")
    },
    setSelectedUser:(selectedUser)=>set({selectedUser})
}))