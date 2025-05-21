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
    }
}))