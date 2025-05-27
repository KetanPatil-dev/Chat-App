import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSignUp: false,
  isLogin: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers:[],
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkauth");
      set({ authUser: res.data });
    } catch (error) {
      console.log(error.response?.data?.message, { id: "checkAuth" });
      set({ isCheckingAuth: false });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSignUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account Created Successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  login: async (data) => {
    try {
      set({ isLogin: true });
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login Successful");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isLogin: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");

      set({ authUser: null });
      toast.success("Logout Successful");
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  },
  updateProfile:async(data)=>{
    try {
        set({isUpdatingProfile:true})
        const res= await axiosInstance.post("/auth/update-profile",data)
        set({authUser:res.data})
        toast.success("Profile Updated Successfully")
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
    finally{
        set({isUpdatingProfile:false})
    }
  }
}));