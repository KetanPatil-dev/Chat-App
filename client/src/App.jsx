
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/userAuthStore";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "lucide-react";

function App() {
  const { authUser,isCheckingAuth,checkAuth,} = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
 
  if(isCheckingAuth && !authUser)
  {
    return (
      <div className="flex items-center justify-center h-screen">
<Loader className=" text-emerald-700 size-10 animate-spin"/>
      </div>
    )
  }
   
  return (
    <div>
      <NavBar />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={authUser?<HomePage />:<Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser?<SignupPage />:<Navigate to="/"/>} />
        <Route path="/login" element={!authUser?<LoginPage /> :<Navigate to="/"/>} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser?<ProfilePage />:<Navigate to="/login"/>} />
        <Route path="*" element={authUser?<HomePage/>:<Navigate to="/login"/>}/>
      </Routes>
    </div>
  );
}

export default App;