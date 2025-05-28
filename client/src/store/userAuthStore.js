import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:9090";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSignUp: false,
  isLogin: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkauth");
      set({ authUser: res.data });
      get().connectSocket();
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
      get().connectSocket();
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
      if(get().socket) get().socket.disconnect()
      get().connectSocket();
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
      get().disconnectSocket();
      toast.success("Logout Successful");
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  },
  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axiosInstance.post("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });
    socket.on("getOnlineUsers", (userIds) => {
      
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
