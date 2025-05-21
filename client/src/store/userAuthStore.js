import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from 'react-toastify';


export const useAuthStore=create((set)=>({
    authUser:null,
    isSignUp:false,
    isLogin:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    checkAuth:async()=>{
        try {
            const res= await axiosInstance.get("/auth/checkauth")
            set({authUser:res.data})
        } catch (error) {
            toast.error(error.response?.data?.message,{id:"checkAuth"})
            set({isCheckingAuth:false})
        }
        finally{
            set({isCheckingAuth:false})
        }
    },
    signup:async(data)=>{
        set({isSignUp:true})
        try {
            const res= await axiosInstance.post("/auth/signup",data)
            set({authUser:res.data})
            toast.success("Account Created Successfully.")
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
        finally{
            set({isCheckingAuth:false})
        }
    }
}))