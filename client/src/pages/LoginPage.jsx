import React, { useState } from 'react';
import { data, Link } from 'react-router-dom';
import { useAuthStore } from '../store/userAuthStore'
// Make sure these are imported from your chosen icon library (e.g., react-icons)
import { MessageSquare, Mail, Lock, Eye, EyeOff, Loader, ArrowBigRight } from 'lucide-react'; 
import AuthImagePattern from '../components/AuthImagePattern';


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const {isLogin,authUser,login}=useAuthStore()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit=(e)=>{
  e.preventDefault()
  login(formData)

}
  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* left side */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className='font-bold text-black text-2xl mt-1'>Log In</h1>
              <p className='text-base-content/60 font-bold'>Continue your Conversation.😉</p>
            </div>
          </div>
          <form className='space-y-6' onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="relative z-50 size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="mail.ketan027@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className='relative z-50' />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input input-bordered w-full pl-10 pr-10"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/40"
                  onClick={() => setShowPassword(e => !e)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLogin}
            >
              {isLogin ? (
                <>
                  Loading... <Loader className='animate-spin' />
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>
          <Link to="/signup">
            <p className='mt-2 flex justify-center hover:text-orange-800 cursor-pointer'>
              Dont have an account? Sign Up <ArrowBigRight />
            </p>
          </Link>
        </div>
      </div>
     
      <div className='hidden lg:block bg-base-200'>
        <AuthImagePattern
          title="Join Us"
          subtitle="Chat with friends, family and always stay connected."
        />
      </div>
    </div>
  );
};

export default LoginPage;